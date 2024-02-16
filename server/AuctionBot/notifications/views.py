from django.shortcuts import render


def your_view(request):
    can_view_custom_notif_button = request.user.has_perm('notifications.can_view_custom_notif_button')
    return render(request, 'base.html', {'can_view_custom_notif_button': can_view_custom_notif_button})
