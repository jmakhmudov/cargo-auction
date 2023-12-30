from django.urls import path, include
from . import api

from rest_framework import routers


router = routers.DefaultRouter()


urlpatterns = [
    # path('', views.index),
    path('', include(router.urls)),  # Include the router.urls
    path('api/bot/tguser-create/', api.TgUserCreateView.as_view()),
    path('api/bot/lot/', api.LotList.as_view()),
    path('api/bot/lot/<int:pk>/', api.LotView.as_view()),
    path('api/bot/parameters/', api.ParametersView.as_view()),
    path('api/bot/bet-create/', api.BetCreateView.as_view()),

]

