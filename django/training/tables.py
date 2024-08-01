import django_tables2 as tables
from .models import TrainingSchedule, TrainingAttendance, TrainingNomination
from django_tables2.utils import A
from django.utils import timezone
import itertools

class ScheduleTable(tables.Table):
    from_date = tables.DateColumn(format='M. d, Y')
    to_date = tables.DateColumn(format='M. d, Y')
    status = tables.Column(empty_values=(), orderable=False)
    no_nominated = tables.LinkColumn(
        'training-schedule-nomination',
        args=[A('name__slug'), A('pk')],
        text=lambda record: record.no_nominated(),
        attrs={'a': {'style': 'color: blue;'}},
    )
    no_trainees = tables.LinkColumn(
        'training-schedule-attendance',
        args=[A('name__slug'), A('pk')],
        text=lambda record: record.no_trainees(),
        attrs={'a': {'style': 'color: blue;'}},
    )
    
    # Add a style for the document column
    # document = tables.Column(attrs={'td': {'style': 'color: blue;'}})
    class Meta:
        model = TrainingSchedule
        template_name = "django_tables2/bootstrap-responsive.html"
        fields = ("name", "from_date", 'to_date', 'trainer__name','trainer__category', 'training_area','no_trainees', 'no_nominated','document')

    def render_status(self, value, record):
        today = timezone.now().date()
        if record.to_date < today:
            return "Completed"
        else:
            return "Yet to"

class AttendanceTable(tables.Table):
    counter = tables.Column(empty_values=(), verbose_name='#')
    class Meta:
        model = TrainingAttendance
        template_name = "django_tables2/bootstrap-responsive.html"
        fields = ("counter","employee__name", "employee__department", 'employee__designation', 'attended_days','attendance_upload', 'assessment_upload','feedback_upload')

    def __init__(self, *args, **kwargs):
        super(AttendanceTable, self).__init__(*args, **kwargs)
        self.counter = itertools.count(1)

    def render_counter(self):
        return next(self.counter)


class NominationTable(tables.Table):
    counter = tables.Column(empty_values=(), verbose_name='#')
    class Meta:
        model = TrainingNomination
        template_name = "django_tables2/bootstrap-responsive.html"
        fields = ("counter","employee__name", "employee__department", 'employee__designation', )

    def __init__(self, *args, **kwargs):
        super(NominationTable, self).__init__(*args, **kwargs)
        self.counter = itertools.count(1)

    def render_counter(self):
        return next(self.counter)