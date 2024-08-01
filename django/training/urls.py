from django.urls import path
from . import views
from . import autocomplete_views
from .models import Employee

urlpatterns = [
    path('', views.home, name='home'),
    path('training/', views.training, name='training'),
    path("training/<slug:training_slug>/", views.training_scheduled, name='training-details'),
    path('training/<slug:training_slug>/<int:training_schedule_id>/attendance/',views.training_schedule_attendance, name='training-schedule-attendance'),  
    path('training/<slug:training_slug>/<int:training_schedule_id>/nomination/',views.training_schedule_nomination, name='training-schedule-nomination'),    
]

urlpatterns += [
    path(
        '^employee-nomination-autocomplete/$',
        autocomplete_views.NominationEmployeeView.as_view(model=Employee),
        name='employee-nomination-autocomplete'
    ),
    path(
        '^employee-attendance-autocomplete/$',
        autocomplete_views.AttendanceEmployeeView.as_view(model=Employee),
        name='employee-attendance-autocomplete'
    ),
]