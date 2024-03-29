# Generated by Django 5.0.1 on 2024-02-16 10:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0001_initial'),
        ('notifications', '0005_alter_announcements_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('isViewed', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bot.tguser')),
            ],
        ),
    ]
