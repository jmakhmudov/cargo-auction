from .models import Lot, Bet, Parameters
from rest_framework import viewsets, permissions
from .serializers import (LotSerializer, BetSerializer, ParametersSerializer)


class LotViewSet(viewsets.ModelViewSet):
    queryset = Lot.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = LotSerializer


class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = BetSerializer


class ParametersViewSet(viewsets.ModelViewSet):
    queryset = Parameters.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ParametersSerializer
