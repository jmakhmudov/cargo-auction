# Generated by Django 5.0.1 on 2024-05-24 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0004_lot_allowed_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lot',
            name='allowed_users',
            field=models.ManyToManyField(to='bot.tguser'),
        ),
    ]