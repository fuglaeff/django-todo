from rest_framework import routers

from . import views


router = routers.SimpleRouter()
router.register(r'api-task', views.TaskView, basename='task')
router.register(r'api-comm', views.CommentView, basename='comment')
router.register(r'api-points', views.PointView, basename='comment')
