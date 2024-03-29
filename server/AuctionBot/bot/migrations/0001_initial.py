# Generated by Django 5.0.1 on 2024-01-31 18:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lot',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='Имя лота')),
                ('start_date', models.DateTimeField(verbose_name='Начало')),
                ('finish_date', models.DateTimeField(verbose_name='Конец')),
                ('lot_description', models.TextField(verbose_name='Описание лота')),
                ('customer_name', models.CharField(max_length=255, verbose_name='Заказчик')),
                ('customer_details', models.TextField(verbose_name='Адрес, телефон заказчика')),
                ('departure', models.CharField(help_text='Город, страна', max_length=300, verbose_name='Откуда')),
                ('destination', models.CharField(help_text='Город, страна', max_length=300, verbose_name='Куда')),
                ('loading_address', models.TextField(verbose_name='Адрес склада для загрузки')),
                ('loading_time', models.DateTimeField(verbose_name='Время готовности к погрузке')),
                ('destination_address', models.TextField(verbose_name='Адрес склада назначения')),
                ('shipping_type', models.CharField(help_text='Авто, Жд, Авиа, Cборный', max_length=255, verbose_name='Тип перевозки')),
                ('shipment_terms', models.CharField(help_text='(FCA, EXW)', max_length=255, verbose_name='Условия отгрузки')),
                ('cargo_description', models.TextField(verbose_name='Описание груза')),
                ('temperature', models.CharField(blank=True, help_text='Укажите диапазон температур, если требуется температурный режим.', max_length=255, null=True, verbose_name='Температура')),
                ('packaging_type', models.CharField(max_length=255, verbose_name='Вид упаковки')),
                ('packing_description', models.TextField(verbose_name='Описание упаковки')),
                ('packaging_dimensions', models.CharField(help_text='Пример: 120x80x200', max_length=255, verbose_name='Габариты упаковки (ДxШxВ см)')),
                ('volume', models.FloatField(blank=True, null=True, verbose_name='Объем (куб.м)')),
                ('weight', models.FloatField(verbose_name='Общий вес брутто (кг)')),
                ('del_time', models.IntegerField(verbose_name='Срок доставки (Дни)')),
                ('initial_bet', models.FloatField(verbose_name='Начальная ставка')),
                ('currency', models.CharField(choices=[('USD', 'Доллары'), ('EUR', 'Евро'), ('UZS', 'Сум'), ('RUB', 'Рубли'), ('GBP', 'Фунт стерлингов'), ('JPY', 'Японская иена')], max_length=3, verbose_name='Валюта')),
                ('is_cancelled', models.BooleanField(default=False, verbose_name='Отменен')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
            ],
            options={
                'verbose_name': ' ',
                'verbose_name_plural': 'Лоты',
            },
        ),
        migrations.CreateModel(
            name='TgUser',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='ФИО')),
                ('telephone_num', models.CharField(max_length=20, verbose_name='Номер телефона')),
                ('email', models.EmailField(max_length=254)),
                ('comp_name', models.CharField(max_length=255, verbose_name='Название компании')),
                ('job_title', models.CharField(max_length=255, verbose_name='Должность')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Комментарий')),
                ('role_change_time', models.DateTimeField(blank=True, null=True, verbose_name='Последнее изменение роли')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
                ('role', models.CharField(choices=[('OBS', 'Наблюдатель'), ('PAR', 'Учаcтник'), ('CUS', 'Заказчик')], default='OBS', max_length=3, verbose_name='Роль')),
            ],
            options={
                'verbose_name': ' ',
                'verbose_name_plural': 'Пользователи',
            },
        ),
        migrations.CreateModel(
            name='Bet',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('amount', models.FloatField(verbose_name='Сумма')),
                ('comment', models.TextField(blank=True, null=True, verbose_name='Комментарий')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
                ('lot', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='bets', to='bot.lot', verbose_name='Лот')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bot.tguser', verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': ' ',
                'verbose_name_plural': 'Ставки',
            },
        ),
    ]
