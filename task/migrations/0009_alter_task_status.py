# Generated by Django 4.0.5 on 2022-06-22 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0008_alter_task_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.IntegerField(choices=[(0, 'created'), (1, 'active'), (2, 'completed')]),
        ),
    ]