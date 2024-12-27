# Generated by Django 4.2.16 on 2024-12-26 16:23

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0005_alter_user_role"),
        ("classes", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="class",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="class",
            name="status",
            field=models.CharField(
                choices=[
                    ("active", "Active"),
                    ("completed", "Completed"),
                    ("archived", "Archived"),
                ],
                default="active",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="class",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="livesession",
            name="created_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="livesession",
            name="session_id",
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AddField(
            model_name="livesession",
            name="status",
            field=models.CharField(
                choices=[
                    ("scheduled", "Scheduled"),
                    ("ongoing", "Ongoing"),
                    ("completed", "Completed"),
                ],
                default="scheduled",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="livesession",
            name="students",
            field=models.ManyToManyField(
                related_name="joined_session", to="users.user"
            ),
        ),
        migrations.AddField(
            model_name="livesession",
            name="teacher",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="hosted_session",
                to="users.user",
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="livesession",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name="ondemandsession",
            name="created_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="ondemandsession",
            name="duration",
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="ondemandsession",
            name="thumbnail",
            field=models.ImageField(blank=True, null=True, upload_to="thumbnails/"),
        ),
        migrations.AddField(
            model_name="ondemandsession",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name="topic",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True,default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="topic",
            name="updated_at",
            field=models.DateTimeField(auto_now=True,default=django.utils.timezone.now),
        ),
    ]
