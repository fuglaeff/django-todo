from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet

from .filters import MyTaskFilter
from .models import Task
from .serializers import TaskSerializer


class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (MyTaskFilter, )

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        request.data['status'] = 0
        super().create(request, *args, **kwargs)
        return Response(request.data, status=status.HTTP_201_CREATED)
