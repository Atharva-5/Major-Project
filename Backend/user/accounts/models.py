from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    caste = models.CharField(max_length=50, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=False, null=False, default="other")
    photo = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

