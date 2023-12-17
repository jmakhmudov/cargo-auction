from django.contrib import admin
from .models import User
from .models import Bet
from .models import Lot
from .models import Parameters

admin.site.register(User)
admin.site.register(Bet)
admin.site.register(Lot)
admin.site.register(Parameters)
