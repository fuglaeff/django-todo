from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import SAFE_METHODS

from .decoraters import comment_after_action, add_points
from .filters import MyTaskFilter
from .models import Task, Comment, Point
from .serializers import TaskSerializer, CommentSerializer, PointSerializer


class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (MyTaskFilter, )

    def create(self, request, *args, **kwargs):
        print(request.data['points'])
        return super().create(request, *args, **kwargs)

    @add_points
    @comment_after_action('task')
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status=Task.CREATED)

    @comment_after_action('task')
    def perform_update(self, serializer):
        super().perform_create(serializer)


class PointView(ModelViewSet):
    queryset = Point.objects.all()
    serializer_class = PointSerializer

    @comment_after_action('point')
    def perform_create(self, serializer):
        super().perform_create(serializer)


class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(comm_creator=self.request.user)


def index(request):
    return render(request, 'index.html')
