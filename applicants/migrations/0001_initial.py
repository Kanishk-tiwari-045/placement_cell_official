# Generated by Django 5.0.3 on 2024-03-20 19:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("marketing", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Applicant",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone_number", models.CharField(max_length=15)),
                ("address", models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name="Skill",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="ApplicantProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("highest_qualification", models.CharField(max_length=100)),
                ("stream", models.CharField(max_length=100)),
                (
                    "year",
                    models.CharField(
                        choices=[
                            ("First", "First"),
                            ("Second", "Second"),
                            ("Third", "Third"),
                            ("Fourth", "Fourth"),
                        ],
                        max_length=10,
                    ),
                ),
                (
                    "education_status",
                    models.CharField(
                        choices=[("Finished", "Finished"), ("Pursuing", "Pursuing")],
                        max_length=10,
                    ),
                ),
                ("passing_year", models.IntegerField(blank=True, null=True)),
                ("cgpa", models.DecimalField(decimal_places=2, max_digits=4)),
                (
                    "student",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profile",
                        to="applicants.applicant",
                    ),
                ),
                (
                    "skills",
                    models.ManyToManyField(
                        related_name="students", to="applicants.skill"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Application",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("application_date", models.DateTimeField(auto_now_add=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("applied", "Applied"),
                            ("shortlisted", "Shortlisted"),
                            ("rejected", "Rejected"),
                        ],
                        default="applied",
                        max_length=12,
                    ),
                ),
                (
                    "applicant_profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="applicants.applicantprofile",
                    ),
                ),
                (
                    "job",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="marketing.job"
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="applicants.applicant",
                    ),
                ),
            ],
        ),
    ]