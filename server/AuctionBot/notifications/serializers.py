from rest_framework import serializers
from bot.models import TgUser

class ViewedUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TgUser
        fields = 'isViewed',

class NotViewedUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = TgUser
        fields = 'id', 'name', 'isViewed', 'created_at'