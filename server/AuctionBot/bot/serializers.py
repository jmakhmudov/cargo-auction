from rest_framework import serializers
from .models import TgUser, Lot, Bet



class TgUserSerializer(serializers.ModelSerializer):
    # Add TgUser
    class Meta:
        model = TgUser
        exclude = ('status',)


class TgUserCheckSerializer(serializers.ModelSerializer):
    # Add TgUser
    class Meta:
        model = TgUser
        fields = '__all__'


class BetSerializer(serializers.ModelSerializer):
    # Add Bet
    class Meta:
        model = Bet
        fields = '__all__'



class LotSerializer(serializers.ModelSerializer):

    last_bet = BetSerializer(read_only=True)
    total_bets = serializers.IntegerField(read_only=True)
    class Meta:
        model = Lot
        fields = '__all__'
