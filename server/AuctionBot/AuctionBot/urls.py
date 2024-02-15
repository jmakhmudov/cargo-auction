from django.contrib import admin
from django.urls import path, include
from admin_notification.views import check_notification_view
admin.site.site_header = 'Auction-Bot Admin Panel'
admin.site.site_title = 'Admin Panel'
# admin.site.index_title = 'Admin Panel'


urlpatterns = [
    path('tg-adminchik/', admin.site.urls),
    path('check/notification', check_notification_view, name="check_notifications"),
    path('', include('bot.urls')),
]
