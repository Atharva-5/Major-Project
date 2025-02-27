from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    id = models.BigAutoField(primary_key=True)  # Explicitly setting the primary key
    user_id = models.CharField(max_length=10, unique=True, editable=False,null=False)  # Auto-generated User ID
    
    phone = models.CharField(max_length=15, blank=True, null=True)
    caste = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')], blank=True, null=True)
    photo = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.user_id:  # Generate user_id only if it's not set
            last_user = CustomUser.objects.order_by('-id').first()
            next_id = last_user.id + 1 if last_user else 1
            self.user_id = f"U{next_id:05d}"  # Example: "U00001", "U00002"
        super().save(*args, **kwargs)