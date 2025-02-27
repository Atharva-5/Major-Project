from django.contrib import admin
from django.contrib.auth.models import User
from .models import Connection

admin.site.register(User)  # ✅ This registers the User model
admin.site.register(Connection)