from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.IntegerField()
    status = models.BooleanField()

    def __str__(self):
        return f"{self.id}, {self.role}"
    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

class Bet(models.Model):
    id = models.AutoField(primary_key=True)
    amount = models.FloatField()
    comment = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_time = models.IntegerField()
    def __str__(self):
        return f"{self.id}, {self.role}"
    class Meta:
        verbose_name = "Ставка"
        verbose_name_plural = "Ставки"

class Lot(models.Model):
    id = models.AutoField(primary_key=True)
    parameters = models.ForeignKey('Parameters', on_delete=models.CASCADE)
    bets = models.ManyToManyField(Bet)
    start_date = models.IntegerField()
    finish_date = models.IntegerField()
    last_bet_id = models.FloatField()
    created_at = models.IntegerField()
    created_by = models.IntegerField()
    def __str__(self):
        return f"{self.id}, {self.role}"
    class Meta:
        verbose_name = "Лот"
        verbose_name_plural = "Лоты"

class Parameters(models.Model):
    id = models.AutoField(primary_key=True)
    departure = models.TextField()
    destination = models.TextField()
    volume = models.FloatField()
    weight = models.FloatField()
    is_danger = models.BooleanField()
    description = models.TextField()
    conditions = models.CharField(max_length=255)
    initial_bet = models.FloatField()
    currency = models.IntegerField()
    del_time = models.IntegerField()
    created_at = models.IntegerField()

    def __str__(self):
        return f"{self.id}, {self.role}"
    class Meta:
        verbose_name = "Параметры"
        verbose_name_plural = "Параметры"
