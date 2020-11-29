from django.db import models

# Create your models here.


class Doctor(models.Model):
    name=models.CharField(max_length=30,null=True)
    department=models.CharField(max_length=30,null=True)
    speciality=models.CharField(max_length=30,null=True)
    locality=models.CharField(max_length=50,null=True)
    consultant_in=models.TextField(null=True)
    experience=models.IntegerField(default=0)
    days=models.TextField(null=True)
    routin_start_time=models.CharField(max_length=10,null=True)
    routin_end_time=models.CharField(max_length=10,null=True)
    qualification=models.TextField(null=True)
    photo=models.ImageField(upload_to='images')

    def __str__(self):
        return self.name

    class Meta:
        db_table='Doctor'


class Booking(models.Model):
    patient_name=models.CharField(max_length=30,default='')
    phone=models.CharField(max_length=13,default='')
    app_date=models.CharField(max_length=20,default='')
    book_date=models.DateTimeField(auto_now=True,null=True)
    time_slot=models.CharField(max_length=10,default='')
    specialist=models.CharField(max_length=30,default='')
    specialist_name=models.CharField(max_length=30,default='')

    def __str__(self):
        return self.patient_name

    class Meta:
        db_table='Booking'


class Information(models.Model):
    info=models.CharField(max_length=100)

    def __str__(self):
        return self.info

    class Meta:
        db_table='Information'


class Book_health_check(models.Model):
    city_name=models.CharField(max_length=20)
    hospital_name=models.CharField(max_length=50)
    patient_name=models.CharField(max_length=20)
    phone_no=models.CharField(max_length=15)
    email=models.CharField(max_length=20)


    def __str__(self):
        return self.city_name

    class Meta:
        db_table='Book_health_check'


class Location(models.Model):
    city=models.CharField(max_length=50)
    hospital=models.TextField()

    def __str__(self):
        return self.city

    class Meta:
        db_table='Location'


class HealthLibrary(models.Model):
    comment=models.TextField()
    image=models.ImageField(upload_to='libraryImages')

    class Meta:
        db_table='HealthLibrary'



    



