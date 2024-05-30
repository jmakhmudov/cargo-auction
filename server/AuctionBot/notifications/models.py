from django.db import models
from bot.models import TgUser


class Announcements(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name='Название анонса', help_text="Отправляться не будет")
    message_text = models.TextField(verbose_name='Текст')
    img = models.ImageField(verbose_name=("Картинка"), blank=True, null=True, upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создан')
    allowed_users = models.ManyToManyField(TgUser, verbose_name='Пользователи',
                                           help_text="Выберите пользователей допущенных до Объявления")

    class Meta:
        verbose_name = ' '
        verbose_name_plural = 'Анонсы'

class CustomPermission(models.Model):
    class Meta:
        permissions = [
            ("can_view_custom_notif_button", "Can view custom notification button"),
        ]


