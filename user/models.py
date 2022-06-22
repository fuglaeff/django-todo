from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Team(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300)


class Profile(models.Model):
    user_photo = models.ImageField(null=True)
    company = models.CharField(max_length=50, null=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )


class UserTeam(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='teams'
    )
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name='users'
    )
    join_date = models.DateField(auto_now_add=True)


class SocialLink(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='links'
    )
    social_web = models.CharField(max_length=50)
    link = models.URLField()
