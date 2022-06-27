from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import SAFE_METHODS

from .decoraters import auto_fill_user_and_status, comment_after_action
from .filters import MyTaskFilter
from .models import Task
from .serializers import TaskSerializer


class TaskView(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = (MyTaskFilter, )

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @comment_after_action
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status=Task.CREATED)

    @comment_after_action
    def perform_update(self, serializer):
        super().perform_create(serializer)


class PointView(ModelViewSet):
    pass


class CommentView(ModelViewSet):
    pass


def index(request):
    return render(request, 'index.html')
