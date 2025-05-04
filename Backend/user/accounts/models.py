from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
    # Explicitly setting the primary key
    id = models.BigAutoField(primary_key=True)
    user_id = models.CharField(
        max_length=10, unique=True, editable=False, null=False)  # Auto-generated User ID
    # Ensuring password field is not editable
    password = models.CharField(max_length=128, verbose_name='password')

    phone = models.CharField(max_length=15, blank=True, null=True)
    caste = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=[(
        'Male', 'Male'), ('Female', 'Female')], blank=True, null=True)
    photo = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
# New Added fields
    occupation = models.CharField(max_length=100, blank=True, null=True)

    interests = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.user_id:  # Generate user_id only if it's not set
            last_user = CustomUser.objects.order_by('-id').first()
            next_id = last_user.id + 1 if last_user else 1
            self.user_id = f"U{next_id:05d}"  # Example: "U00001", "U00002"
        super().save(*args, **kwargs)


class Notification(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="sent_notifications", on_delete=models.CASCADE)
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="received_notifications", on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification from {self.sender} to {self.receiver}"


class Connection(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_connections')
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_connections')
    # Optional: Stores when the connection was made
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username} → {self.receiver.username}"

    def accept(self):
        self.is_accepted = True
        self.save()
        # Create a notification for the sender that the request was accepted
        Notification.objects.create(
            sender=self.receiver,
            receiver=self.sender,
            message=f"{self.receiver.username} has accepted your connection request."
        )

    def reject(self):
        self.delete()  # Remove the connection if rejected
        # Create a notification for the sender that the request was rejected
        Notification.objects.create(
            sender=self.receiver,
            receiver=self.sender,
            message=f"{self.receiver.username} has rejected your connection request."
        )
