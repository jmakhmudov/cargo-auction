from rest_framework import generics
from .models import Notification
from .serializers import NotificationSerializer


class NotificationList(generics.ListAPIView):
    queryset = Notification.objects.filter(isViewed=False)
    serializer_class = NotificationSerializer
