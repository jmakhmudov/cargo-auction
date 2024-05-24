from AuctionBot.celery import app
from celery import shared_task
from django.utils import timezone
from bot.models import Lot, Bet
from .signals import send_notification_to_winner, get_last_bet


@app.task
def check_lot_status():
    print('hello')

