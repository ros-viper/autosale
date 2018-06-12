from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Car, Model, Make


class CarSerializer(serializers.ModelSerializer):
    title = serializers.CharField()

    class Meta:
        model = Car
        exclude = ('owner',)


class UserSerializer(serializers.ModelSerializer):
    cars = serializers.PrimaryKeyRelatedField(many=True, queryset=Car.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'cars')


class ModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Model
        fields = ('name', 'id')


class MakeSerializer(serializers.ModelSerializer):
    models = ModelSerializer(many=True)

    class Meta:
        model = Make
        fields = ('name', 'models', 'id')