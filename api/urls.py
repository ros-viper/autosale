from django.urls import path
from api import views

urlpatterns = [
    path('', views.CarList.as_view()),
    path('<int:pk>/', views.CarDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view())
]