from django.contrib import admin
from django.urls import path, include

admin.site.site_header = 'Auction-Bot Admin Panel'
admin.site.site_title = 'Admin Panel'
# admin.site.index_title = 'Admin Panel'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('bot.urls'))
]
