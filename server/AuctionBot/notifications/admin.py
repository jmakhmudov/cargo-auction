from django.contrib import admin
from .models import Announcements
@admin.register(Announcements)
class AnnouncementsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    search_fields = ('id', 'name', 'message_text', 'created_at',)
    list_display_links = ('id', 'name')
    #exclude = ('img',)