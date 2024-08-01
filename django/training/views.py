from django.shortcuts import render, get_object_or_404
from .models import *
from django.db.models import Count, Q, F, Sum
from .forms import DateRangeFilterForm, TrainingScheduleFilterForm
from .tables import ScheduleTable, AttendanceTable, NominationTable
from django.utils import timezone

# Create your views here.
def home(request):
    form = DateRangeFilterForm(request.GET)
    start_date=''
    end_date=''
    department_filters = {}
    training_filters = {}
    filters={}
    attendace_filters= {}
    if form.is_valid():
        start_date = form.cleaned_data['start_date']
        end_date = form.cleaned_data['end_date']
        if start_date:
            filters['from_date__gte']=start_date
            attendace_filters['training__from_date__gte']=start_date
            training_filters['trainingschedule__from_date__gte'] = start_date
            department_filters['trainingtype__trainingschedule__from_date__gte'] = start_date
        if end_date:
            training_filters['trainingschedule__to_date__lte'] = end_date
            filters['to_date__lte']=end_date
            attendace_filters['training__from_date__lte']=end_date
            department_filters['trainingtype__trainingschedule__to_date__lte'] = end_date
    training_types = TrainingType.objects.filter(**training_filters).annotate(schedule_count=Count('trainingschedule')).filter(schedule_count__gt=0).values('id','name', 'schedule_count')
    departments = Department.objects.filter(**department_filters).annotate(schedule_count=Count('trainingtype__trainingschedule')).filter(schedule_count__gt=0).values('id','name', 'schedule_count')
    for training_type in training_types:
        training_type['total_departments'] = TrainingType.objects.get(id=training_type['id']).department.count()
        training_type['total_employees_trained'] = TrainingAttendance.objects.filter(**attendace_filters).filter(training__name__id=training_type['id']).count()
    
    for department in departments:
        department['total_employees_dept_trained'] = TrainingSchedule.objects.filter(trainingattendance__employee__department__id=department['id']).filter(**filters).values('trainingattendance__employee').distinct().count()

    context = {
        'training_types': list(training_types),
        'departments': list(departments),
        'form':form,
    }

    return render(request, 'home.html', context)

def training(request):
    form = DateRangeFilterForm(request.GET)
    start_date=''
    end_date=''
    training_schedules = TrainingSchedule.objects.all()
    if form.is_valid():
        start_date = form.cleaned_data['start_date']
        end_date = form.cleaned_data['end_date']
        if start_date:
            training_schedules = training_schedules.filter(from_date__gte=start_date)
        if end_date:
            training_schedules = training_schedules.filter(to_date__lte=end_date)
    training_type_counts = training_schedules.values('name__name', 'name__slug').annotate(count=Count('name')).order_by('-count')
    training_types = training_schedules.values('name__name', 'name__slug', 'name__description', 'name').annotate(count=Count('name')).order_by('-count')
    return render(request,"training.html", context={'training_type':list(training_type_counts)
                                                 ,'training_types':training_types,
                                                 'form':form,
                                                 'start_date':f"{start_date}",
                                                 'end_date':f"{end_date}"})

def training_scheduled(request, training_slug):
    form = TrainingScheduleFilterForm(request.GET)
    training = get_object_or_404(TrainingType, slug=training_slug)
    training_schedules = TrainingSchedule.objects.filter(name=training)
    if form.is_valid():
        print('valid')
        start_date = form.cleaned_data['start_date']
        end_date = form.cleaned_data['end_date']
        status = form.cleaned_data['status']
        if start_date:
            training_schedules = training_schedules.filter(from_date__gte=start_date)
        if end_date:
            training_schedules = training_schedules.filter(to_date__lte=end_date)
        if status=='completed':
            training_schedules = training_schedules.filter(to_date__lte=timezone.now().date())
        elif status=='yet_to':
            training_schedules = training_schedules.filter(to_date__gte=timezone.now().date())
        
    table = ScheduleTable(training_schedules)
    table.order_by=request.GET.get("sort", "")
    table.paginate(page=request.GET.get("page", 1), per_page=25)
    return render (request,'scheduled_trainings.html', context={'training':training,
                                                                'training_scheduled':training_scheduled,
                                                                'table':table, 
                                                                'form':form})

def training_schedule_attendance(request, training_slug, training_schedule_id):
    training = get_object_or_404(TrainingType, slug=training_slug)
    training_schedule = get_object_or_404(TrainingSchedule, id=training_schedule_id)
    table = AttendanceTable(TrainingAttendance.objects.filter(training=training_schedule))
    table.order_by=request.GET.get("sort", "")
    table.paginate(page=request.GET.get("page", 1), per_page=25)
    context={'table':table, 'training_schedule':training_schedule, 'training':training,'name':'Attendance'}
    return render(request, 'training_schedule_attendance.html', context)

def training_schedule_nomination(request, training_slug, training_schedule_id):
    training = get_object_or_404(TrainingType, slug=training_slug)
    training_schedule = get_object_or_404(TrainingSchedule, id=training_schedule_id)
    table = NominationTable(TrainingNomination.objects.filter(training=training_schedule))
    table.order_by=request.GET.get("sort", "")
    table.paginate(page=request.GET.get("page", 1), per_page=25)
    context={'table':table, 'training_schedule':training_schedule, 'training':training, 'name':'Nomination'}
    return render(request, 'training_schedule_attendance.html', context)