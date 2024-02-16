from rest_framework import generics
from bot.models import TgUser
from .serializers import ViewedUpdateSerializer, NotViewedUsersSerializer


class NotificationUpdateAPIView(generics.UpdateAPIView):
    queryset = TgUser.objects.all()
    serializer_class = ViewedUpdateSerializer

class NotificationList(generics.ListAPIView):
    queryset = TgUser.objects.filter(isViewed=False)
    serializer_class = NotViewedUsersSerializer
