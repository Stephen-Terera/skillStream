# Generated by Django 4.2.16 on 2024-12-26 16:42

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("classes", "0003_alter_class_created_at_alter_class_updated_at_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="livesession",
            name="end_time",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name="livesession",
            name="start_time",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name="task",
            name="due_date",
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
