from datetime import timezone
from django.utils import timezone

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
    role_change_time = models.DateTimeField(null=True, blank=True, verbose_name='Последнее изменение роли')

    def save(self, *args, **kwargs):
        if self.role != self.__original_role:  # Check if role has changed
            self.role_change_time = timezone.now()  # Use timezone.now()
        super().save(*args, **kwargs)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_role = self.role

    OBS = 'OBS'
    PAR = 'PAR'
    CUS = 'CUS'
    ROLE_CHOICES = [
        (OBS, 'Наблюдатель'),
        (PAR, 'Учаcтник'),
        (CUS, 'Заказчик'),
    ]
    role = models.CharField(default=OBS, max_length=3, choices=ROLE_CHOICES, verbose_name='Роль')

    class Meta:
        verbose_name = ' '
        verbose_name_plural = 'Пользователи'


class Lot(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, verbose_name='Имя лота')
    start_date = models.DateTimeField(verbose_name='Начало')
    finish_date = models.DateTimeField(verbose_name='Конец')
    lot_description = models.TextField(verbose_name='Описание лота')
    customer_name = models.CharField(max_length=255, verbose_name='Заказчик')
    customer_details = models.TextField(verbose_name='Адрес, телефон заказчика')
    departure = models.CharField(max_length=300, verbose_name='Откуда', help_text="Город, страна")
    destination = models.CharField(max_length=300, verbose_name='Куда', help_text="Город, страна")
    loading_address = models.TextField(verbose_name='Адрес склада для загрузки')
    loading_time = models.DateTimeField(verbose_name='Время готовности к погрузке')
    destination_address = models.TextField(verbose_name='Адрес склада назначения')
    shipping_type = models.CharField(max_length=255, verbose_name='Тип перевозки', help_text='Авто, Жд, Авиа, Cборный')
    shipment_terms = models.CharField(max_length=255, verbose_name='Условия отгрузки', help_text='(FCA, EXW)')
    cargo_description = models.TextField(verbose_name='Описание груза')
    temperature = models.CharField(max_length=255, verbose_name='Температура', blank=True, null=True,
                                   help_text='Укажите диапазон температур, если требуется температурный режим.')

    packaging_type = models.CharField(max_length=255, verbose_name='Вид упаковки')
    packing_description = models.TextField(verbose_name='Описание упаковки')
    packaging_dimensions = models.CharField(max_length=255, verbose_name="Габариты упаковки (ДxШxВ см)",
                                            help_text="Пример: 120x80x200")

    volume = models.FloatField(verbose_name='Объем (куб.м)',blank=True, null=True)
    weight = models.FloatField(verbose_name='Общий вес брутто (кг)')

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

    del_time = models.IntegerField(verbose_name='Срок доставки (Дни)',)
    initial_bet = models.FloatField(verbose_name='Начальная ставка')
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, verbose_name='Валюта')
    is_cancelled = models.BooleanField(default=False, verbose_name='Отменен')
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


