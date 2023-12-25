from django.contrib import admin
from .models import TgUser, Bet, Lot, Parameters, CustomUser
from django.contrib.auth.models import User, Group

from django.urls import reverse
from django.utils.html import format_html
from django.utils.http import urlencode

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'last_login')


admin.site.unregister(User)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)



@admin.register(TgUser)
class TgUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title', 'status',)
    # list_display_links = ('id', 'role')
    # search_fields = ('role',) ???????
    list_editable = ('status',)
    list_filter = ('status', 'comp_name',)
    search_fields = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title',)

@admin.register(Bet)
class BetAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'lot', 'user', 'created_at')
    list_display_links = ('id',)
    list_filter = ('lot',)
    search_fields = ('id', 'lot', 'user',)

    # def view_users_link(self, obj):
    #     user = obj.user
    #     url = (
    #             reverse("admin:/bot/bet/") + "?" + urlencode({"user__id": f"{user.id}"})
    #     )
    #     return format_html(f'<a href="{url}">{user.id} TgUser</a>', url, user)
    #
    # view_users_link.short_description = "TgUser"


# class ParametersAdmin(admin.ModelAdmin):
#     list_display = ('id', 'description', 'departure', 'destination', 'initial_bet', 'del_time')

class ParametersInline(admin.StackedInline):  # You can use admin.TabularInline for a more compact view
    model = Parameters
    extra = 0
    max_num = 1

@admin.register(Lot)
class LotAdmin(admin.ModelAdmin):

    list_display = ('id', 'start_date', 'finish_date',)
    model = Lot
    inlines = [ParametersInline]
    search_fields = ('id',)



# class ParametersAdmin(admin.ModelAdmin):
#      list_display = ('id',)


# admin.site.register(TgUser, TgUserAdmin)
# admin.site.register(Bet, BetAdmin)
# admin.site.register(Lot, LotAdmin)
# admin.site.register(Parameters, ParametersAdmin)


