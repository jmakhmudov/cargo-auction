from django.db.models.signals import post_save
from django.dispatch import receiver
import requests
from django.conf import settings
from .models import Bet
import os

def get_last_bet(lot_id):
    try:
        last_bet = Bet.objects.filter(lot_id=lot_id).order_by('-created_at')[1]
        return last_bet
    except IndexError:
        return None
    except Bet.DoesNotExist:
        return None

def sendPushNotif(id, message):
    payload = {
        'chat_id': id,
        'text': message,
        'parse_mode': 'HTML',
    }
    try:
        response = requests.post(f"https://api.telegram.org/bot6979715664:AAFh4wFIA02ads-aJ6DXCvqdRNfIQKeq9xU/sendMessage", json=payload)
        response.raise_for_status()
        print("Telegram message sent successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Error sending Telegram message: {e}")

@receiver(post_save, sender=Bet)
def send_telegram_notification(sender, instance, created, **kwargs):
    if created:
        last_bet = get_last_bet(instance.lot.id)
        if last_bet is not None:
          message = f"<b>‼️ Ваша ставка <i>{last_bet.amount} {last_bet.lot.currency}</i> на лот <i>{instance.lot.name} - #{last_bet.lot_id}</i> перебита</b>"
          sendPushNotif(last_bet.user.id, message)

        else:
          print("No bets found for the specified lot.")

        
