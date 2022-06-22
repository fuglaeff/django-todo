from rest_framework import routers

from . import views


router = routers.SimpleRouter()
router.register(r'api-task', views.TaskView, basename='task')
