# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from .models import Car
from .serializers import CarSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions, authentication
from .permissions import IsOwnerOrReadOnly
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.views.generic.base import TemplateView


# Create your views here.

# @api_view(['GET', 'POST'])
# def car_list(request):
#
#     if request.method == 'GET':
#         cars = Car.objects.all()
#         serializer = CarSerializer(cars, many=True)
#         return Response(serializer.data)
#
#     elif request.method == 'POST':
#         serializer = CarSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def car_detail(request, pk):
#     try:
#         car = Car.objects.get(pk=pk)
#     except Car.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = CarSerializer(car)
#         return Response(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = CarSerializer(car, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         car.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class MyPagination(PageNumberPagination):

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'pages': self.page.paginator.num_pages,
            'cars': data
        })

class DashboardSetPagination(MyPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 10

class ListSetPagination(MyPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100


class CarList(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    pagination_class = ListSetPagination

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class Dashboard(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    pagination_class = DashboardSetPagination

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CarDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAdminUser,)