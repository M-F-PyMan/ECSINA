from django.contrib import admin
from .models import User,UserManager,TempUser,Profile

admin.site.register(User),
admin.site.register(UserManager),
admin.site.register(TempUser),
admin.site.register(Profile)

