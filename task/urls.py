from . import views
from .routing import router
from django.urls import re_path

app_name = 'task'

urlpatterns = [
    re_path(r'^my_tasks/', views.index)
]

urlpatterns += router.urls
