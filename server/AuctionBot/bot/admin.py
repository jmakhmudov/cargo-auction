from django.contrib import admin
from .models import TgUser, Bet, Lot
from django.contrib.auth.models import Group, User
from django.urls import reverse
from django.utils.html import format_html
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.utils.timesince import timesince

# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'last_login')
#     list_filter = ('username',)
#     search_fields = ('username', 'email',)
#
#
#
#
#
# admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)

@admin.register(TgUser)
class TgUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title', 'role', 'role_change_time')
    list_editable = ('role',)
    list_filter = ('role', 'comp_name',)
    search_fields = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title', 'role')
    exclude = ('role_change_time',)
@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'view_lot_link', 'view_user_link', 'created_at')
    list_display_links = ('id',)
    list_filter = ('lot',)
    search_fields = ('id', 'lot', 'user',)

    def view_user_link(self, obj):
        user = obj.user
        url = reverse("admin:bot_tguser_change", args=[user.id])
        return format_html('<a href="{}">{}</a>', url, f"🔗 ID {user.id}")

    def view_lot_link(self, obj):
        lot = obj.lot
        url = reverse("admin:bot_lot_change", args=[lot.id])
        return format_html('<a href="{}">{}</a>', url, f"🔗 ID {lot.id}")

    view_lot_link.short_description = "Лот"
    view_user_link.short_description = "Пользователь"


class IsActiveFilter(admin.SimpleListFilter):
    title = _('Активен')
    parameter_name = 'is_active'

    def lookups(self, request, model_admin):
        return (
            ('1', _('Yes')),
            ('0', _('No')),
        )

    def queryset(self, request, queryset):
        if self.value() == '1':
            current_time = timezone.now()
            return queryset.filter(start_date__lte=current_time, finish_date__gt=current_time)
        elif self.value() == '0':
            return queryset.exclude(start_date__lte=timezone.now(), finish_date__gt=timezone.now())

@admin.register(Lot)
class LotAdmin(admin.ModelAdmin):

    list_display = ('view_lot', 'start_date', 'finish_date',
                    'initial_bet', 'last_bet_link', 'last_bet_user_link', 'bets_link',
                    'departure', 'destination', 'is_active', 'is_cancelled','lot_winner_link')
    list_filter = ('start_date', 'finish_date', IsActiveFilter, 'is_cancelled',)
    search_fields = ('id', 'start_date', 'finish_date', 'departure', 'destination', 'initial_bet')
    exclude = ('is_cancelled',)

    def lot_winner_link(self, obj):
        if not obj.is_cancelled and obj.finish_date <= timezone.now():
            try:
                # Retrieve the latest bet within the lot's time frame
                latest_bet = obj.bets.filter(created_at__lte=obj.finish_date).latest('created_at')

                # Access the user who made the winning bet
                winning_user = latest_bet.user

                # Construct the link to the winning user's details
                url = reverse("admin:bot_tguser_change",
                              args=[winning_user.id])  # Replace "app_name" with your app's name
                return format_html('<a href="{}"> 🔗 {}</a>', url, winning_user.comp_name)

            except Bet.DoesNotExist:
                # No bets or expired without any bets
                return '-'
        else:
            # Lot is not expired or cancelled
            return '-'

    lot_winner_link.short_description = "Победитель лота"
    def view_lot(self, obj):
        url = reverse("admin:bot_lot_change", args=[obj.id])
        return format_html('<a href="{}">Посмотреть Лот {}</a>', url, f"ID {obj.id}")

    view_lot.short_description = "Лот"

    def last_bet_user_link(self, obj):
        try:
            last_bet = obj.bets.latest('created_at')
            url = reverse("admin:bot_tguser_change",
                          args=[last_bet.user.id])  # Replace "app_name" with your app's name
            return format_html('<a href="{}">🔗 {}</a>', url, last_bet.user.comp_name)
        except Bet.DoesNotExist:
            return '-'

    last_bet_user_link.short_description = "Текущий лидер"

    def last_bet_link(self, obj):
        try:
            last_bet = obj.bets.latest('created_at')
            url = reverse("admin:bot_bet_change", args=[last_bet.id])
            return format_html('<a href="{}">🔗 {} {}</a>', url, f"{last_bet.amount}", obj.currency)
        except Bet.DoesNotExist:
            return ('Ставок нет')

    last_bet_link.short_description = "Последняя ставка"

    def is_active(self, obj):
        current_time = timezone.now()
        return (obj.start_date <= current_time and obj.finish_date > current_time and not obj.is_cancelled)

    is_active.boolean = True
    is_active.short_description = "Активен"

    def bets_link(self, obj):
        return format_html('<a href="/tg-adminchik/bot/bet/?lot__id__exact={} ">🔗 Кол-во {}</a>',
                           obj.id, obj.bets.count())  # Replace "app_name" with your app's name

    bets_link.short_description = "Все ставки"


    #_______Actions_______
    def finish_early(modeladmin, request, queryset):
        queryset.update(finish_date=timezone.now())

    finish_early.short_description = "Завершить досрочно"

    def cancel_lot(modeladmin, request, queryset):

        for lot in queryset:
            lot.is_cancelled = not lot.is_cancelled  # Invert the current value
            lot.save()

    cancel_lot.short_description = "Отменить/Восстановить лот"

    actions = [finish_early, cancel_lot,]

    class Media:
        js = ('bot/js/calculate_volume.js', 'bot/js/row_indicator.js',)
