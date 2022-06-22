# Generated by Django 4.0.5 on 2022-06-19 22:14

from django.db import migrations, models
import django.db.models.deletion
import task.validators


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0002_rename_comments_comment_rename_points_point'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='planned_comp_dt',
            field=models.DateTimeField(null=True, validators=[task.validators.plan_comp_date_validator]),
        ),
        migrations.CreateModel(
            name='TaskFiles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='static/upload_files')),
                ('file_type', models.IntegerField(choices=[(0, 'task file'), (1, 'result file')])),
                ('task_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='task.task')),
            ],
        ),
    ]