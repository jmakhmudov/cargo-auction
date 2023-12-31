from django.urls import path
from . import api, views

from rest_framework import routers


router = routers.DefaultRouter()


urlpatterns = [
    path('', views.index),
    path('api/bot/tguser/<int:pk>/', api.TgUserView.as_view()),
    path('api/bot/tguser-create/', api.TgUserCreateView.as_view()),
    path('api/bot/active-lots/', api.LotList.as_view()),
    path('api/bot/active-lot/<int:pk>/', api.LotView.as_view()),
    path('api/bot/expired-lots/', api.ExpiredLotList.as_view()),
    path('api/bot/expired-lot/<int:pk>/', api.ExpiredLotView.as_view()),
    path('api/bot/bet-create/', api.BetCreateView.as_view()),


]

