from django.contrib import admin
from .models import Car
from .models import Make
from .models import Model

# Register your models here.

admin.site.register(Car)
admin.site.register(Make)
admin.site.register(Model)
