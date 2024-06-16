import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AuctionBot.settings')

app = Celery('AuctionBot')

app.conf.timezone = 'Asia/Tashkent'

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    'every_minute': {
        'task': 'notifications.tasks.check_lot_status',
        'schedule': crontab(minute="*/3")

    }
}

app.autodiscover_tasks()
