from django.urls import path, include
from . import views

from rest_framework import routers
from .api import LotViewSet, BetViewSet, ParametersViewSet

router = routers.DefaultRouter()

router.register(r'api/bot/lot/active', LotViewSet, basename='lot')
router.register(r'api/bot/bet', BetViewSet, basename='bet')
router.register(r'api/bot/parameters', ParametersViewSet, basename='parameters')

urlpatterns = [
    # path('', views.index),
    path('', include(router.urls)),  # Include the router.urls
]

