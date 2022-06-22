from rest_framework.serializers import ModelSerializer
from . import models


class PointSerializer(ModelSerializer):
    class Meta:
        model = models.Point
        fields = '__all__'


class CommentSerializer(ModelSerializer):
    class Meta:
        model = models.Comment
        fields = '__all__'


class TaskSerializer(ModelSerializer):
    points = PointSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = models.Task
        fields = '__all__'
