from django.urls import path
from .api import NotificationUpdateAPIView,  NotificationList

urlpatterns = [
    path('api/change-notifications-status/<int:pk>/', NotificationUpdateAPIView.as_view()),
    path('api/unviewed-notifications/', NotificationList.as_view()),
]

