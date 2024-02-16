from django.urls import path
from .api import NotificationList

urlpatterns = [
    path('api/unviewed-notifications/', NotificationList.as_view()),

]

