from .models import Lot, Bet, TgUser
from .serializers import (LotSerializer, BetSerializer, TgUserSerializer, TgUserCheckSerializer)
from rest_framework import generics
from rest_framework.response import Response

from django.utils import timezone


class TgUserView(generics.RetrieveAPIView):
    queryset = TgUser.objects.all()
    serializer_class = TgUserCheckSerializer

class TgUserCreateView(generics.CreateAPIView):
    serializer_class = TgUserSerializer


class LotView(generics.RetrieveAPIView):
    serializer_class = LotSerializer

    def get_queryset(self):
        now = timezone.now()
        return Lot.objects.filter(start_date__lte=now, finish_date__gte=now)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.last_bet = instance.bets.latest('created_at')
        except Bet.DoesNotExist:
            instance.last_bet = None
        instance.total_bets = instance.bets.count()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class LotList(generics.ListAPIView):
    serializer_class = LotSerializer

    def get_queryset(self):
        now = timezone.now()
        return Lot.objects.filter(start_date__lte=now, finish_date__gte=now)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        for lot in queryset:
            try:
                lot.last_bet = lot.bets.latest('created_at')
            except Bet.DoesNotExist:
                lot.last_bet = None
            lot.total_bets = lot.bets.count()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ExpiredLotList(generics.ListAPIView):
    serializer_class = LotSerializer

    def get_queryset(self):
        now = timezone.now()
        return Lot.objects.filter(finish_date__lt=now)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        for lot in queryset:
            try:
                lot.last_bet = lot.bets.latest('created_at')  # Attempt to retrieve last bet
            except Bet.DoesNotExist:
                lot.last_bet = None  # Set to None if no bets exist
            lot.total_bets = lot.bets.count()  # Calculate total bets
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ExpiredLotView(generics.RetrieveAPIView):
    serializer_class = LotSerializer

    def get_queryset(self):
        now = timezone.now()
        return Lot.objects.filter(finish_date__lt=now)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.last_bet = instance.bets.latest('created_at')
        except Bet.DoesNotExist:
            instance.last_bet = None
        instance.total_bets = instance.bets.count()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class BetCreateView(generics.CreateAPIView):
    serializer_class = BetSerializer
