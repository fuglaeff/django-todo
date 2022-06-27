from task.models import Task, Comment
from django.contrib.auth import get_user_model

from task.serializers import CommentSerializer

User = get_user_model()


def create_system_comment(comment: str, task_id: int) -> dict:
    data = {
        'comment': comment,
        'comm_creator': 3,
        'task_id': task_id,
    }
    serializer = CommentSerializer(data=data)
    serializer.is_valid()
    serializer.save()
    return serializer.data


def auto_fill_user_and_status(create_func):
    def wrapper(self, request, *args, **kwargs):
        request.data['user'], request.data['status'] = request.user.id, 0
        return create_func(self, request, *args, **kwargs)
    return wrapper


def comment_after_action(save_func):
    def wrapper(self, serializer):
        method = self.request.method

        if method == 'POST':
            save_func(self, serializer)
            task = serializer.data['id']
            comment = f'Created task: #{task}'
            task_json = create_system_comment(comment=comment, task_id=task)
            serializer.data['comments'].append(task_json)

        if method == 'PATCH':
            changing_data = self.request.data
            task = serializer.instance
            for field_name, value in changing_data.items():
                old_value = task.serializable_value(field_name)
                comment = f'Changing {field_name}: {old_value} -> {value}'
                create_system_comment(comment=comment, task_id=task.id)

            save_func(self, serializer)

    return wrapper
