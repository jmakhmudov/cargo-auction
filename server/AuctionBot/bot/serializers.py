from rest_framework import serializers
from .models import TgUser, Lot, Bet



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
    # Add Bet
    class Meta:
        model = Bet
        fields = '__all__'



class LotSerializer(serializers.ModelSerializer):

    last_bet = BetSerializer(read_only=True)
    total_bets = serializers.IntegerField(read_only=True)
    is_cancelled = serializers.BooleanField()
    class Meta:
        model = Lot
        fields = '__all__'
