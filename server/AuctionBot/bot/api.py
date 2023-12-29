from .models import Lot, Bet, Parameters
from .serializers import (LotSerializer, BetSerializer,ParametersSerializer, TgUserSerializer)

from rest_framework import viewsets, permissions
from rest_framework import generics
from rest_framework.response import Response

from django.utils import timezone


class TgUserCreateView(generics.CreateAPIView):
    serializer_class = TgUserSerializer


class LotView(generics.RetrieveAPIView):
    queryset = Lot.objects.filter(finish_date__gte=timezone.now())
    serializer_class = LotSerializer


class LotList(generics.ListAPIView):
    queryset = Lot.objects.filter(finish_date__gte=timezone.now())
    serializer_class = LotSerializer


class ParametersView(generics.ListAPIView):
    queryset = Parameters.objects.all()
    serializer_class = ParametersSerializer


class BetCreateView(generics.CreateAPIView):
    serializer_class = BetSerializer
