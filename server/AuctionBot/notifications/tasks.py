from AuctionBot.celery import app
from celery import shared_task
from django.utils import timezone
from bot.models import Lot, Bet
from .signals import send_notification_to_winner
from datetime import datetime, timedelta

@app.task
def check_lot_status():
    three_mins_ago = datetime.now() - timedelta(minutes=3)
    expired_lots = Lot.objects.filter(finish_date__gt=three_mins_ago, finish_date__lte=datetime.now())
    if expired_lots:
        perform_sending_messages(expired_lots)
    else:
        print('No expired lots')


@shared_task
def perform_sending_messages(expired_lots):
    for expired_lot in expired_lots:
        latest_bet = Bet.objects.filter(lot_id=expired_lot.id).order_by('-created_at')[0]
        try:
            winner_user = latest_bet.user.id
            send = send_notification_to_winner(winner_user, expired_lot)

        except:
            print('failed to sent notification ot wiinner')