from rest_framework import serializers
from .models import TgUser, Lot, Bet, Parameters
from datetime import datetime
from django.utils import timezone


class TgUserSerializer(serializers.ModelSerializer):
    # Add TgUser
    class Meta:
        model = TgUser
        exclude = ('status',)


class BetSerializer(serializers.ModelSerializer):
    # Add Bet
    class Meta:
        model = Bet
        fields = '__all__'


class ParametersSerializer(serializers.ModelSerializer):
    # Add Parameters
    class Meta:
        model = Parameters
        fields = '__all__'


class LotSerializer(serializers.ModelSerializer):
    parameters = ParametersSerializer(read_only=True)
    last_bet = BetSerializer(read_only=True)
    total_bets = serializers.IntegerField(read_only=True)
    class Meta:
        model = Lot
        fields = '__all__'
