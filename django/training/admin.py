from django.contrib import admin
from .models import Employee, Department, Designation, TrainingType, TrainingSchedule, Trainer, TrainingAttendance, ExternalTraining, TrainingNomination
from django.utils.html import format_html
from .admin_forms import TrainingNominationForm, TrainingAttendanceForm

# Register your models here.
class TrainingAttendanceInline(admin.StackedInline):
    model = TrainingAttendance
    form = TrainingAttendanceForm
    autocomplete_fields=['employee', 'training']
    extra = 0

class TrainingNominationInline(admin.StackedInline):
    model = TrainingNomination
    form = TrainingNominationForm
    autocomplete_fields=['employee', 'training']
    extra = 0


class TrainingScheduleInline(admin.StackedInline):
    model=TrainingSchedule
    autocomplete_fields = ('name','trainer')
    extra=0

class EmployeeInline(admin.TabularInline):
    model = ExternalTraining.list_of_attendees.through
    extra=0
    can_delete = False

    def get_max_num(self, request, obj=None, **kwargs):
        return 0
    
class TrainerInline(admin.StackedInline):
    model = Trainer
    extra = 0 

class EmployeeAdminInline(admin.StackedInline):
    model=Employee
    extra = 0
    autocomplete_fields = ['department', 'designation']

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'head','created_at', 'updated_at')
    search_fields = ('name', )
    inlines = [EmployeeAdminInline]

@admin.register(Designation)
class DesignationAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', )
    inlines = [EmployeeAdminInline, TrainerInline]

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('emp_id', 'name','department', 'designation', 'created_at', 'updated_at')
    list_filter = ('department', 'designation',)
    search_fields = ('name','emp_id')
    autocomplete_fields = ('department', 'designation')
    inlines=[EmployeeInline, TrainingNominationInline, TrainingAttendanceInline]

@admin.register(TrainingType)
class TrainingTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'display_departments','created_at', 'updated_at')
    search_fields = ('name', 'description',)
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['department']
    filter_horizontal = ['department']
    inlines=[TrainingScheduleInline]

    def display_departments(self, obj):
        return format_html("<br>".join([f"{index+1}) {department.name}" for index,department in enumerate(obj.department.all())]))

    display_departments.short_description = 'Departments'

@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ('tr_code','name', 'category','designation','expertise')
    search_fields = ('name', 'tr_code','expertise')
    list_filter = ('designation', 'category')
    autocomplete_fields = ('designation',)
    inlines=[TrainingScheduleInline]

@admin.register(TrainingSchedule)
class TrainingScheduleAdmin(admin.ModelAdmin):
    list_display = ('tp_code','name', 'trainer_name','Duration', 'from_date', 'to_date', 'training_area', 'no_trainees')
    list_filter = ('duration', 'name', 'from_date', 'to_date')
    search_fields = ('tp_code','training_area')
    autocomplete_fields = ('name', 'trainer')
    inlines=[TrainingNominationInline,TrainingAttendanceInline]

    def trainer_name(self, obj):
        if obj.trainer:
            return f"{obj.trainer.name}"
        else:
            return ""

    def Duration(self, obj):
        return f"{obj.duration} Days"
    
@admin.register(TrainingAttendance)
class TrainingAttendanceAdmin(admin.ModelAdmin):
    form = TrainingAttendanceForm
    list_display = ('training_code', 'employee_id','employee_name', 'attended_days')
    search_fields = ('training__tp_code', 'employee__name', "employee__emp_id")
    list_filter = ['training__tp_code']
    autocomplete_fields = ('training', 'employee')

    def training_code(self,obj):
        return f"{obj.training.tp_code}"
    
    def employee_id(self,obj):
        return f"{obj.employee.emp_id}"

    def employee_name(self,obj):
        return f"{obj.employee.name}"
    
@admin.register(ExternalTraining)
class ExternalTrainingAdmin(admin.ModelAdmin):
    list_display = ('ext_program_code', 'organizer', 'place', 'duration', 'from_date', 'to_date','training_area')
    search_fields = ('ext_program_code', 'organizer', 'place','training_area')
    list_filter = ('from_date', 'to_date',)
    filter_horizontal = ('list_of_attendees', )

@admin.register(TrainingNomination)
class TrainingNominationAdmin(admin.ModelAdmin):
    form = TrainingNominationForm
    list_display = ('training_code', 'employee_id','employee_name', )
    search_fields = ('training__tp_code', 'employee__name', "employee__emp_id")
    list_filter = ['training__tp_code']
    autocomplete_fields = ('training',)

    def training_code(self,obj):
        return f"{obj.training.tp_code}"
    
    def employee_id(self,obj):
        return f"{obj.employee.emp_id}"

    def employee_name(self,obj):
        return f"{obj.employee.name}"