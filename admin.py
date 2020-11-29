from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Doctor)
admin.site.register(Booking)
admin.site.register(Information)
admin.site.register(Book_health_check)
admin.site.register(Location)
admin.site.register(HealthLibrary)
