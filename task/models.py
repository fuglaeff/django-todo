from django.db import models
from django.contrib.auth import get_user_model
from .validators import plan_comp_date_validator

User = get_user_model()

TASK_STATUS = (
    (0, 'created',),
    (1, 'active',),
    (2, 'completed',),
)

TASK_PRIORITY = (
    (0, 'light',),
    (1, 'medium',),
    (2, 'hard',),
    (3, 'ultimate',),
)


class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    created_dt = models.DateTimeField(auto_now_add=True)
    planned_comp_dt = models.DateTimeField(validators=[plan_comp_date_validator, ])
    status = models.IntegerField(choices=TASK_STATUS)
    priority = models.IntegerField(choices=TASK_PRIORITY)
    creator = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_tasks'
    )
    executor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='my_tasks'
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
