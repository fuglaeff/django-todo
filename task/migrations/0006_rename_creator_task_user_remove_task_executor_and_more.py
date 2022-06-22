# Generated by Django 4.0.5 on 2022-06-22 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0005_task_team'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='creator',
            new_name='user',
        ),
        migrations.RemoveField(
            model_name='task',
            name='executor',
        ),
        migrations.RemoveField(
            model_name='task',
            name='planned_comp_dt',
        ),
        migrations.RemoveField(
            model_name='task',
            name='priority',
        ),
        migrations.RemoveField(
            model_name='task',
            name='team',
        ),
        migrations.DeleteModel(
            name='TaskFile',
        ),
    ]