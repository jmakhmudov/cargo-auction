from django.db.models.signals import post_save
from django.dispatch import receiver
import requests
from bot.models import Lot, TgUser, Bet
from .models import Announcements
from django.conf import settings
import os



BOT_TOKEN = settings.BOT_TOKEN

def get_all_client_ids():
    client_ids = TgUser.objects.values_list('id', flat=True)
    return list(client_ids)


def get_last_bet(lot_id):
    try:
        last_bet = Bet.objects.filter(lot_id=lot_id).order_by('-created_at')[1]
        return last_bet
    except IndexError:
        return None
    except Bet.DoesNotExist:
        return None


def send_push_notification(id, message):
    payload = {
        'chat_id': id,
        'text': message,
        'parse_mode': 'HTML',
    }
    telegram_api_url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
    try:
        response = requests.post(telegram_api_url, json=payload)
        response.raise_for_status()
        print("Telegram message sent successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Error sending Telegram message: {e}")

def send_push_img_notification(id, message, img_url=None):
    payload = {
        "chat_id": id,
        "caption": message,
        "parse_mode": "HTML"
    }
    telegram_api_url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendPhoto'
    try:
        with open(img_url, 'rb') as photo:
            files = {'photo': photo}
            response = requests.post(telegram_api_url, data=payload, files=files)
            response.raise_for_status()
        print("Telegram message sent successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Error sending Telegram message: {e}")
from django.db.models.signals import m2m_changed


@receiver(m2m_changed, sender=Lot.allowed_users.through)
def send_lot_notification(sender, instance, action, **kwargs):
    if action == "post_add":
        all_client_ids = instance.allowed_users.values_list('id', flat=True)
        print(all_client_ids)
        message = (f"<b>‼️Появился новый лот!</b>\n\nЛот <b>{instance.name}</b> был только что добавлен\n"
                   f"<b>Начало торгов</b> - {instance.start_date}")
        for id in all_client_ids:
            send_push_notification(id, message)


@receiver(m2m_changed, sender=Announcements.allowed_users.through)
def send_announcement_notification(sender, instance, action, **kwargs):
    if action == "post_add":
        all_client_ids = instance.allowed_users.values_list('id', flat=True)
        img_url = instance.img.path if instance.img else None
        message = instance.message_text

        for id in all_client_ids:
            if img_url:
                print("Sending image notification...")
                send_push_img_notification(id, message, img_url)
            else:
                print("Sending text notification...")
                send_push_notification(id, message)

@receiver(post_save, sender=Bet)
def send_telegram_notification(sender, instance, created, **kwargs):
    if created:
        last_bet = get_last_bet(instance.lot.id)
        if last_bet:
          message = (f"<b>‼️ Ваша ставка <i>{last_bet.amount} {last_bet.lot.currency}</i> на лот "
                     f"<i>{instance.lot.name} - #{last_bet.lot_id}</i> перебита</b>")
          send_push_notification(last_bet.user.id, message)
        else:
          print("No bets found for the specified lot.")


def send_notification_to_winner(winner, lot):
    message = f"<b>‼️ Вы победили в лоте <i>{lot.name}, #{lot.id}</i>"
    send_push_notification(winner, message)




