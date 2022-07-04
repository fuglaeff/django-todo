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

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['comm_dt'] = instance.comm_dt.strftime('%H:%M %d.%m.%y')
        representation['comm_creator'] = instance.comm_creator.username

        return representation


class TaskSerializer(ModelSerializer):
    points = PointSerializer(read_only=True, many=True)
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = models.Task
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['created_dt'] = instance.created_dt.strftime('%d.%m.%Y')

        return representation
