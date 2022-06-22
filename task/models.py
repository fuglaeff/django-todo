from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

TASK_STATUS = (
    (0, 'created',),
    (1, 'active',),
    (2, 'completed',),
)


class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    created_dt = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=TASK_STATUS)
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_tasks'
    )


class Point(models.Model):
    description = models.CharField(max_length=300)
    is_complete = models.BooleanField(default=False)
    task_id = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='points'
    )


class Comment(models.Model):
    comment = models.CharField(max_length=200)
    comm_dt = models.DateTimeField(auto_now_add=True)
    comm_creator = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='comments'
    )
    task_id = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='comments'
    )
