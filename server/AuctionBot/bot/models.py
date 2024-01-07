from django.db import models
from django.contrib.auth.models import User


class CustomUser(User):
    class Meta:
        proxy = True
        app_label = 'auth'
        verbose_name = (' ')
        verbose_name_plural = ('Админы')


class TgUser(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name='ФИО')
    telephone_num = models.CharField(max_length=20, verbose_name='Номер телефона')
    email = models.EmailField()
    comp_name = models.CharField(max_length=255, verbose_name='Название компании')
    job_title = models.CharField(max_length=255, verbose_name='Должность')
    comment = models.TextField(verbose_name='Комментарий', null=True, blank=True)
    status = models.BooleanField(verbose_name='Подтвержден', default=False)

    class Meta:
        verbose_name = ' '
        verbose_name_plural = 'Пользователи'


class Lot(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateTimeField(verbose_name='Начало')
    finish_date = models.DateTimeField(verbose_name='Конец')

    USD = 'USD'
    EUR = 'EUR'
    RUB = 'RUB'
    UZS = 'UZS'
    GBP = 'GBP'
    JPY = 'JPY'
    CURRENCY_CHOICES = [
        (USD, 'Доллары'),
        (EUR, 'Евро'),
        (UZS, 'Сум'),
        (RUB, 'Рубли'),
        (GBP, 'Фунт стерлингов'),
        (JPY, 'Японская иена'),
    ]

    description = models.TextField(verbose_name='Описание')
    departure = models.TextField(verbose_name='Откуда')
    destination = models.TextField(verbose_name='Куда')
    del_time = models.IntegerField(verbose_name='Срок доставки (Дни)')
    volume = models.FloatField(verbose_name='Объем (куб.м)')
    weight = models.FloatField(verbose_name='Вес (кг)')
    is_danger = models.BooleanField(verbose_name='Опасен')
    conditions = models.TextField(verbose_name='Условия транспортировки')
    initial_bet = models.FloatField(verbose_name='Начальная ставка')
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, verbose_name='Валюта')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создан')



    class Meta:
        verbose_name = ' '
        verbose_name_plural = 'Лоты'


class Bet(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.FloatField(verbose_name='Сумма')
    comment = models.TextField(verbose_name='Комментарий', null=True, blank=True)
    user = models.ForeignKey(TgUser, on_delete=models.CASCADE, verbose_name='Пользователь')
    lot = models.ForeignKey(Lot, related_name='bets', on_delete=models.CASCADE, default=0, verbose_name='Лот')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создан')

    class Meta:
        verbose_name = ' '
        verbose_name_plural = 'Ставки'


