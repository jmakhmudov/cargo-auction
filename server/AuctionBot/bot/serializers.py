from rest_framework import serializers
from .models import TgUser, Lot, Bet
from django.utils import timezone
from datetime import timedelta


class TgUserSerializer(serializers.ModelSerializer):
    # Add TgUser
    class Meta:
        model = TgUser
        exclude = ('role', 'role_change_time')


class TgUserCheckSerializer(serializers.ModelSerializer):
    # Add TgUser
    class Meta:
        model = TgUser
        fields = ('id','name', 'comp_name', 'role',)


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = '__all__'

    def create(self, validated_data):
        bet = super().create(validated_data)
        lot = bet.lot
        current_time = timezone.now()

        if lot.finish_date - timedelta(minutes=5) <= current_time <= lot.finish_date:
            lot.finish_date += timedelta(minutes=3)
            lot.save()

        return bet


class LotSerializer(serializers.ModelSerializer):

    last_bet = BetSerializer(read_only=True)
    total_bets = serializers.IntegerField(read_only=True)
    allowed_users = serializers.PrimaryKeyRelatedField(queryset=TgUser.objects.all(), many=True)

    is_cancelled = serializers.BooleanField()

    class Meta:
        model = Lot
        fields = '__all__'
