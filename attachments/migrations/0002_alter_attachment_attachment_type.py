# Generated by Django 5.0.4 on 2024-07-10 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("attachments", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="attachment",
            name="attachment_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("resume", "Resume"),
                    ("misc", "Miscellaneous"),
                    ("academic", "Academic Docs"),
                    ("photo_id", "Photo ID"),
                    ("certificates", "Certificates"),
                ],
                max_length=500,
                null=True,
            ),
        ),
    ]
