from dal import autocomplete
from .models import TrainingSchedule, Employee, TrainingNomination

class NominationEmployeeView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        qs = super(NominationEmployeeView, self).get_queryset()
        training = self.forwarded.get('training', None)
        if training:
            departments = TrainingSchedule.objects.get(id=training).name.department.all()
            qs = qs.filter(department__in=departments)
            # qs = qs.filter()

        return qs
    
class AttendanceEmployeeView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        qs = super(AttendanceEmployeeView, self).get_queryset()
        training = self.forwarded.get('training', None)

        if training:
            training_nomination_objects = TrainingNomination.objects.filter(training__id=training)
            nominated_employees = [nomination.employee.id for nomination in training_nomination_objects]
            qs = qs.filter(id__in=nominated_employees)
            # qs = qs.filter()

        return qs