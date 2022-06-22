from django.contrib import admin
from . import models


@admin.register(models.Team)
class TeamAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass


@admin.register(models.UserTeam)
class UserTeamAdmin(admin.ModelAdmin):
    pass


@admin.register(models.SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    pass
