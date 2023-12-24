
from django.contrib import admin
from .models import TgUser, Bet, Lot, Parameters
from django.contrib.auth.models import Group

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import CustomUser


admin.site.unregister(User)
admin.site.register(CustomUser, UserAdmin)
admin.site.unregister(Group)


class TgUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title', 'status',)
    # list_display_links = ('id', 'role')
    # search_fields = ('role',) ???????
    list_editable = ('status',)
    list_filter = ('status', 'comp_name',)
    search_fields = ('id', 'name', 'telephone_num', 'email', 'comp_name', 'job_title',)



class BetAdmin(admin.ModelAdmin):
    list_display = ('id', 'amount', 'lot', 'user', 'created_at')
    list_display_links = ('id',)
    list_filter = ('lot',)
    search_fields = ('id', 'lot', 'user',)

# class ParametersAdmin(admin.ModelAdmin):
#     list_display = ('id', 'description', 'departure', 'destination', 'initial_bet', 'del_time')
class ParametersInline(admin.StackedInline):  # You can use admin.TabularInline for a more compact view
    model = Parameters
    extra = 0
    max_num = 1



class LotAdmin(admin.ModelAdmin):

    list_display = ('id', 'start_date', 'finish_date',)
    model = Lot
    inlines = [ParametersInline]
    search_fields = ('id',)



class ParametersAdmin(admin.ModelAdmin):
     list_display = ('id',)


admin.site.register(TgUser, TgUserAdmin)
admin.site.register(Bet, BetAdmin)
admin.site.register(Lot, LotAdmin)
admin.site.register(Parameters, ParametersAdmin)


