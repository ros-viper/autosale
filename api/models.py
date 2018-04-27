from django.db import models
import datetime
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.

TRANSMISSIONS = [('Manual', 'Manual'), ('Automatic', 'Automatic'), ('Variator', 'Variator'), ('Robotized', 'Robotized')]
YEARS = [(year, year) for year in range(1900, 2020)]
FUELS = [('Petrol', 'Petrol'), ('Diesel', 'Diesel'), ('LPG', 'LPG'), ('Electric', 'Electric'), ('Hybrid', 'Hybrid'),
         ('Other', 'Other')]
DRIVES = [('Front', 'Front'), ('Rear', 'Rear'), ('Full', 'Full')]
BODY_TYPES = [('Convertible', 'Convertible'), ('Coupe', 'Coupe'), ('Hatchback', 'Hatchback'), ('Sedan', 'Sedan'),
              ('Station Wagon', 'Station Wagon'), ('RV/SUV', 'RV/SUV'), ('Ute', 'Ute'), ('Van', 'Van')]


class Car(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    make = models.CharField(max_length=100, blank=False)
    year = models.IntegerField(choices=YEARS, default=datetime.datetime.now().year)
    model = models.CharField(max_length=200, blank=False, default='Other')
    transmission = models.CharField(choices=TRANSMISSIONS, default='Manual', max_length=100)
    description = models.TextField()
    used = models.BooleanField(default=True)
    fuel = models.CharField(choices=FUELS, default='Petrol', max_length=100)
    engine_size = models.DecimalField(blank=True, max_digits=3, decimal_places=1)
    price = models.PositiveIntegerField(blank=False, default=1)
    drive = models.CharField(choices=DRIVES, default='Front', max_length=100)
    odometer = models.PositiveIntegerField(blank=False, default=1)
    consumption = models.PositiveIntegerField(blank=True)
    power = models.PositiveIntegerField(blank=True)
    doors = models.PositiveIntegerField(blank=False, default=2)
    seats = models.PositiveIntegerField(blank=False, default=2)
    body_type = models.CharField(choices=BODY_TYPES, default='Sedan', max_length=100)
    owner = models.ForeignKey('auth.User', related_name='cars', on_delete=models.CASCADE)
    location = models.CharField(max_length=100, blank=False, default='Other')

    class Meta:
        ordering = ('created',)

    def __str__(self):
        """A string representation of the model."""
        return f'{self.make} {self.model} - {self.year}'


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
