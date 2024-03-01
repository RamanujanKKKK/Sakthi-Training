from django import forms
from .models import TrainingNomination, TrainingAttendance
from dal import autocomplete

class TrainingNominationForm(forms.ModelForm):

    class Meta:
        model = TrainingNomination
        fields = ('__all__')
        widgets = {
            'employee': autocomplete.ModelSelect2(url='employee-nomination-autocomplete',
                                                       forward=['training'])
        }

class TrainingAttendanceForm(forms.ModelForm):

    class Meta:
        model = TrainingAttendance
        fields = ('__all__')
        widgets = {
            'employee': autocomplete.ModelSelect2(url='employee-attendance-autocomplete',
                                                       forward=['training'])
        }