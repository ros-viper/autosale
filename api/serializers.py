from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Car

class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        exclude = ('owner',)

class UserSerializer(serializers.ModelSerializer):
    cars = serializers.PrimaryKeyRelatedField(many=True, queryset=Car.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'cars')