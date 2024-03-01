from django import forms

class DateRangeFilterForm(forms.Form):
    start_date = forms.DateField(
        label='Start Date',
        widget=forms.TextInput(attrs={'type': 'date', 'class': 'min-h-[auto] w-full'}),
        required=False
    )
    end_date = forms.DateField(
        label='End Date',
        widget=forms.TextInput(attrs={'type': 'date', 'class': 'min-h-[auto] w-full'}),
        required=False
    )

    
class TrainingScheduleFilterForm(DateRangeFilterForm):
    # start_date = forms.DateField(
    #     label='Start Date',
    #     widget=forms.TextInput(attrs={'type': 'date', 'class': 'min-h-[auto] w-full'})
    # )
    # end_date = forms.DateField(
    #     label='End Date',
    #     widget=forms.TextInput(attrs={'type': 'date', 'class': 'min-h-[auto] w-full'})
    # )
    status = forms.ChoiceField(
        label='Training Status',
        choices=[('all','All'),("completed",'Completed'), ('yet_to','Yet To')],
        widget=forms.Select(attrs={'class': 'max-h [auto] w-full'}),
        required=False
    )
