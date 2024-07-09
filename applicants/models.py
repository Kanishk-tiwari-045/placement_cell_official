from datetime import datetime

from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericRelation

from marketing.models import Job
from attachments.models import Attachment
from accounts.models import CustomUser
from marketing.models import Organisation


STATUS_CHOICES = (
    ("applied", "Applied"),
    ("shortlisted", "Shortlisted"),
    ("rejected", "Rejected"),
)

YEAR_CHOICES = (
    ("First", "First"),
    ("Second", "Second"),
    ("Third", "Third"),
    ("Fourth", "Fourth"),
)

class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
# class Qualification(models.Model):
#     school = models.CharField(max_length=255)
#     qualification = models.CharField(max_length=255)
#     cgpa_or_percentage = models.CharField(max_length=10)
#     description = models.TextField(null=True, blank=True)
#     stream = models.CharField(max_length=255)

#     def str(self):
#         return f"{self.qualification} from {self.school}"
    

class Applicant(models.Model):
    name = models.CharField(max_length=20, default="Guest")
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class ApplicantProfile(models.Model):
    applicant = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="students_qual")
    highest_qualification = models.CharField(max_length=100)
    stream = models.CharField(max_length=100)
    year = models.CharField(max_length=10, choices=YEAR_CHOICES)
    education_status_choices = (
        ("Finished", "Finished"),
        ("Pursuing", "Pursuing"),
    )
    education_status = models.CharField(max_length=10, choices=education_status_choices)
    passing_year = models.IntegerField(null=True, blank=True)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    skills = models.ManyToManyField(Skill, related_name="students")
    # qualification=models.ManyToOneRel(Qualification, related_name='students')
    address = models.TextField(default="NA")
    city = models.CharField(max_length=100, default="NA")
    state = models.CharField(max_length=100, default="NA")
    pincode = models.CharField(max_length=6, default="NA")
    resume = models.FileField(upload_to='resumes/', max_length=250, blank=True, null=True)
    certificates = models.FileField(upload_to='certificates/', max_length=250, blank=True, null=True)

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.applicant.name

class Application(models.Model):
    applicant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    applicant_profile = models.ForeignKey(ApplicantProfile, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    application_date = models.DateTimeField(auto_now_add=True)
    stage = models.IntegerField(default=1)
    answers_to_ques = models.JSONField(blank=True, null=True)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default="applied")

    def __str__(self):
        return self.student.name