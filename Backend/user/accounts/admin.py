from django.contrib import admin
from django.contrib.auth.models import User
from .models import Connection,CustomUser

admin.site.register(User)  # ✅ This registers the User model
admin.site.register(Connection)
admin.site.register(CustomUser)