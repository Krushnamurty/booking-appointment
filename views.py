from datetime import datetime, timedelta

from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import *
from twilio.rest import Client

# Create your views here.


def first(request):
    return render(request,'home.html')


def auto_complete(request):
    info = request.GET.get('letter')
    text=[]
    temp1=[]
    temp2=[]

    if info=='City_Name':
        location = Location.objects.all()
        for i in location:
            temp1.append(i.city)
        text.extend(list(set(temp1)))
        text.sort()
    elif info=='Hospital_Name':
        city = request.GET.get('city')
        location = Location.objects.get(city=city)
        temp2.extend(location.hospital.split(','))
        text.extend(temp2)
        text.sort()
    else:
        data=Information.objects.filter(info__icontains=info)
        text.clear()
        for i in data:
            text.append(i.info)
    return JsonResponse({'text':text})


def information(request):
    info = request.GET.get('data')
    doctor = Doctor.objects.filter(
        Q(name__icontains=info) | Q(department__icontains=info) | Q(speciality__icontains=info))
    text="<div id='information'>"
    for i in doctor:
        image="media/"+str(i.photo)
        text += "<div class='row'><div class='col-sm-2'><img src='" + image + "' class='rounded mx-auto d-block' width='150' height='150'></div><div class='col-sm-4 text-success'><p> Name : " + i.name + "<br> Speciality : "+i.speciality+"<br> Qualification : "+i.qualification+"<br> Experience : "+str(i.experience)+"<br> Days : "+i.days+"<br> Consultant In : "+i.consultant_in+"</p><button type='submit' class='btn btn-success book' id='"+str(i.id)+"'>Book</button></div><div class='col-sm-6 container'><div id='days"+str(i.id)+"'></div><div id='time_series"+str(i.id)+"'></div></div></div>"
    text +="</div>"
    return JsonResponse({'doctor':text})


def days_series(request):
    info=request.GET.get('data')
    doctor=Doctor.objects.get(id=info)
    book_days = []
    book_dates = []
    book_dates_formate=[]
    days=doctor.days.split(' ')
    today_date=datetime.now()
    today_day=today_date.strftime('%a')
    if today_day in days:
        book_days.append(today_day)
        book_dates.append(today_date)

    while len(book_days) <= 5 and len(book_dates) <= 5:
        today_date=today_date+timedelta(days=1)
        today_day = today_date.strftime('%a')
        if today_day in days:
            book_days.append(today_day)
            book_dates.append(today_date)

    for i in book_dates:
        book_dates_formate.append(i.strftime('%d %b %Y'))

    text=''
    for i in range(6):
        text+="<button type='submit' id='"+str(book_dates_formate[i])+","+info+"' class='btn btn-success days'>"+str(book_days[i])+"</button>"
    return JsonResponse({'id': info,'text':text})


def times_series(request):
    info = request.GET.get('data')
    l=info.split(",")
    doctor_id=l[1]
    doctor = Doctor.objects.get(id=doctor_id)
    routin_start_time=doctor.routin_start_time
    routin_end_time=doctor.routin_end_time
    doctor_name=doctor.name
    speciality=doctor.speciality
    date_string=l[0]
    app_date=date_string
    time_slot=[]
    booking=Booking.objects.filter(specialist_name=doctor_name,specialist=speciality,app_date=app_date)
    for i in booking:
        time_slot.append(i.time_slot)

    slot_hours= []

    time = datetime.strptime(routin_start_time, '%H:%M')
    end = datetime.strptime(routin_end_time, '%H:%M')
    while time <= end:
        slot_hours.append(time.strftime("%H:%M"))
        time += timedelta(minutes=15)
    text=''
    for hour in slot_hours:
        if hour in time_slot:
            text += "<button type='submit' class='btn btn-danger hour' id='" + info + "," + str(hour) + "'disabled>" + str(hour) + "</button>"
        else:
            text += "<button type='submit' class='btn btn-info hour' id='" + info + "," + str(hour) + "'>" + str(hour) + "</button>"
    return JsonResponse({'id': str(doctor_id),'text':text})


def user_form(request):
    info = request.GET.get('data')
    l=info.split(',')
    doctor = Doctor.objects.get(id=l[1])
    text="<div class='container p-3'><form><div class='form-group'><label>Patient Name:</label><input type='text' class='form-control' pattern='[A-Za-z]+' name='Patient_Name' id='Patient_Name' required></div><div class='form-group'><label>Phone No:</label><input type='number' class='form-control' pattern='[0-9]{10}'  name='Phone_No' id='Phone_No' required></div><div class='form-group'><label>Doctor Name:</label><input type='text' class='form-control' name='Doctor_Name' value='" +doctor.name+"' id='Doctor_Name' disabled></div><div class='form-group'><label>Appointment Date:</label><input type='text' class='form-control' name='Appointment_Date' value='" +str(l[0])+"' id='Appointment_Date' disabled></div><div class='form-group'><label>Appointment Time:</label><input type='text' class='form-control' name='Appointment_Time' value='" +str(l[2])+"' id='Appointment_Time' disabled></div><div class='form-group'><label>Speciality:</label><input type='text' class='form-control' name='Patient_Name' id='Speciality' value='"+doctor.speciality+"' disabled></div><button type='submit' class='btn btn-danger cancel'>Cancel</button><button type='submit' class='btn btn-primary book' id='1'>Book</button></form></div>"
    return JsonResponse({'text':text})


def book(request):
    patient_name = request.GET.get('Patient_Name')
    phone_no = request.GET.get('Phone_No')
    phone_no1='+91'+phone_no
    doctor_name = request.GET.get('Doctor_Name')
    appointment_date = request.GET.get('Appointment_Date')
    appointment_time = request.GET.get('Appointment_Time')
    speciality = request.GET.get('Speciality')
    data="Patient Name :"+patient_name+" Doctor Name :"+doctor_name+" Appointment Date :"+appointment_date+" Appointment Time :"+appointment_time+" Speciality :"+speciality
    booking = Booking(patient_name=patient_name,phone=phone_no1,app_date=appointment_date,time_slot=appointment_time,specialist=speciality,specialist_name=doctor_name)
    book1=booking.save()
    if book1:
        account_sid = 'AC5faf215bca957a1f6b3533e0ca038b8d'
        auto_token = '0d34245e8524f53b0c7a6d1dd36b560e'
        client = Client(account_sid, auto_token)
        message = client.messages.create(body=data, from_='+12055395617', to=phone_no1)
        text='success'
    else:
        text='no success'
    return JsonResponse({'text':text})


def book_health_check(request):
    text="<div class='container p-3'><form><div><input class='form-control Cities' type='text' placeholder='City_Name'  id='City_Name' required></div><div id='City_Name_List'></div><div><input class='form-control Hospitals' type='text' placeholder='Hospital_Name'  id='Hospital_Name' required></div><div id='Hospital_Name_List'></div><div><input class='form-control' type='text' placeholder='Enter_Name'  id='Enter_Name' pattern='[A-Za-z]+' required></div><div class='input-group'><div class='input-group-prepend'><span class='input-group-text'>+91</span></div><input type='text' class='form-control' placeholder='Phone_No' id='Phone_No' pattern='[0-9]{10}' required></div><div><input class='form-control' type='text' placeholder='Enter Email'  id='Enter_Email' pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' required></div><div><button type='submit' class='btn btn-info' id='Book_Health_Check_submit'>Submit</button></div></form></div>"
    return JsonResponse({'text': text})


def book_health_check_submit(request):
    city_name = request.GET.get('state_name')
    hospital_name = request.GET.get('hospital_name')
    enter_name = request.GET.get('enter_name')
    enter_email = request.GET.get('enter_email')
    phone_no = request.GET.get('phone_no')
    data="Patient Name :"+enter_name+" Hospital Name :"+hospital_name+" City Name :"+city_name
    book=Book_health_check(city_name=city_name,hospital_name=hospital_name,patient_name=enter_name,phone_no='+91'+phone_no,email=enter_email)
    if book.save():
        account_sid = 'AC5faf215bca957a1f6b3533e0ca038b8d'
        auto_token = '0d34245e8524f53b0c7a6d1dd36b560e'
        client = Client(account_sid, auto_token)
        message = client.messages.create(body=data, from_='+12055395617', to='+91'+phone_no)
        text = 'success'
    else:
        text='no success'
    return JsonResponse({'text':text})


def health_library(request):
    text=''
    images=HealthLibrary.objects.all()
    for image in images:
        photo="media/"+str(image.image)
        text += "<div class='container'><a href=''><img src='"+photo+"' width='1100' height='500'><h1>"+image.comment+"</h1></a></div><br>"
    return JsonResponse({'text': text})


def book_appointment(request):
    return JsonResponse({'text':'hhhhhh'})










