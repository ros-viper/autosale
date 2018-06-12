from django.urls import path
from api import views

urlpatterns = [
    path('', views.Dashboard.as_view()),
    path('list/', views.CarList.as_view()),
    path('<int:pk>/', views.CarDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view()),
    path('makes/', views.MakeList.as_view()),
    path('makes/<int:pk>', views.MakeDetail.as_view())
]