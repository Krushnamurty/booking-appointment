from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf import settings
from  django.conf.urls.static import static

admin.site.site_header="Book an Appointment for Doctor"

urlpatterns = [
    path('',views.first,name='first'),
    #path('save_book/', views.index,name='save_book' ),
    path('autocomplete/',views.auto_complete,name='autocomplete'),
    path('information/',views.information,name='information'),
    path('days_series/',views.days_series,name='days_series'),
    path('times_series/',views.times_series,name='times_series'),
    path('user_form/',views.user_form,name='user_form'),
    path('home/',views.first),
    path('book/',views.book,name='book'),
    path('book_health_check/',views.book_health_check,name='book_health_check'),
    path('city_name_list/',views.auto_complete),
    path('hospital_name_list/',views.auto_complete),
    path('book_health_check_submit/',views.book_health_check_submit),
    path('health_library/',views.health_library,name='health_library'),
    path('book_appointment/',views.book_appointment,name='book_appointment')
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)