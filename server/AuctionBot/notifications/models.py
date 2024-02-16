from django.db import models


class Announcements(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name='Название анонса', help_text="Отправляться не будет")
    message_text = models.TextField(verbose_name='Текст')
    img = models.ImageField(verbose_name=("Картинка"), blank=True, null=True, upload_to='images/')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создан')

    class Meta:
        verbose_name = ' '
        verbose_name_plural = 'Анонсы'




