from django.contrib import admin
from .models import TgUser, Bet, Lot, Parameters, CustomUser
from django.contrib.auth.models import Group, User
from django.urls import reverse
from django.utils.html import format_html


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'last_login')
    list_filter = ('username',)
    search_fields = ('username', 'email',)


admin.site.unregister(User)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)

@admin.register(TgUser)
class TgUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title', 'status',)
    list_editable = ('status',)
    list_filter = ('status', 'comp_name',)
    search_fields = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title',)


@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'view_lot_link', 'view_user_link', 'created_at')
    list_display_links = ('id',)
    list_filter = ('lot',)
    search_fields = ('id', 'lot', 'user',)

    def view_user_link(self, obj):
        user = obj.user
        url = reverse("admin:bot_tguser_change", args=[user.id])
        return format_html('<a href="{}">{}</a>', url, f"ID {user.id}")

    def view_lot_link(self, obj):
        lot = obj.lot
        url = reverse("admin:bot_lot_change", args=[lot.id])
        return format_html('<a href="{}">{}</a>', url, f"ID {lot.id}")

    view_lot_link.short_description = "Лот"
    view_user_link.short_description = "Пользователь"


# class ParametersAdmin(admin.ModelAdmin):
#     list_display = ('id', 'description', 'departure', 'destination', 'initial_bet', 'del_time')

# class ParametersInline(admin.StackedInline):
#     model = Parameters
#     extra = 0
#     max_num = 1


@admin.register(Lot)
class LotAdmin(admin.ModelAdmin):

    list_display = ('id', 'start_date', 'finish_date',)
    model = Lot
    # inlines = [ParametersInline]
    search_fields = ('id',)
