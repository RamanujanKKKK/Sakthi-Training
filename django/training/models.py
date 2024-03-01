from django.db import models
from django.core.validators import FileExtensionValidator
from django.utils.text import slugify
from django.core.exceptions import ValidationError

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=255, unique=True)
    head = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ['-updated_at']

class Designation(models.Model):
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ['-updated_at']


class Employee(models.Model):
    emp_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.DO_NOTHING)
    designation = models.ForeignKey(Designation, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.emp_id}"
    
    class Meta:
        ordering = ['-updated_at']

class TrainingType(models.Model):
    name = models.CharField("Training Name", max_length=255, unique=True)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    description = models.TextField(null=True, blank=True)
    department = models.ManyToManyField(Department)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        ordering = ['-updated_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.name}")

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Training Topic'
    
class Trainer(models.Model):
    CATEGORY_CHOICES = [("Internal", "Internal"), ("External", "External")]
    tr_code = models.CharField("Trainer Code", help_text="If left blank, a code would be generated automatically.",
                               max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, verbose_name='trainer name')
    designation = models.ForeignKey(Designation, on_delete=models.DO_NOTHING)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    expertise = models.TextField(null=True, blank=True)
    document = models.FileField(upload_to='trainer_documents/',validators=[
            FileExtensionValidator(allowed_extensions=['pdf']),
        ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']
    
    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)
        if not self.tr_code:
            x='E'
            if self.category == "Internal":
                x="I"
            self.tr_code = f"TR_{x}#"+str(self.id).zfill(5)

        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.tr_code} - {self.name} - {self.category}"

    
class TrainingSchedule(models.Model):
    tp_code = models.CharField("Training Code",help_text="If left blank, a code would be generated automatically.",
                               max_length=255, unique=True, blank=True)
    name = models.ForeignKey(TrainingType, on_delete=models.DO_NOTHING)
    trainer = models.ForeignKey(Trainer, on_delete=models.DO_NOTHING, null=True)
    duration = models.PositiveIntegerField(help_text="Enter duration in number of Days")
    from_date = models.DateField()
    to_date = models.DateField()
    training_area = models.CharField("Training Area/Focus",max_length=255)
    document = models.FileField(upload_to='training_schedule_documents/',validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'xls', 'xlsx']),
        ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)
        if not self.tp_code:
            self.tp_code = "TP#"+str(self.id).zfill(5)

        super().save(*args, **kwargs)

    def no_trainees(self):
        return TrainingAttendance.objects.filter(training=self).count()
    
    def no_nominated(self):
        return TrainingNomination.objects.filter(training=self).count()

    def __str__(self):
        return f"{self.name} - {self.tp_code}"

class TrainingNomination(models.Model):
    training = models.ForeignKey(TrainingSchedule,on_delete=models.DO_NOTHING)
    employee = models.ForeignKey(Employee, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.training.tp_code} - {self.employee.emp_id}"
    
    class Meta:
        unique_together = ('training', 'employee')

class TrainingAttendance(models.Model):
    training = models.ForeignKey(TrainingSchedule,on_delete=models.DO_NOTHING)
    employee = models.ForeignKey(Employee, on_delete=models.DO_NOTHING)
    attended_days = models.PositiveIntegerField(default=0)
    attendance_upload = models.FileField(upload_to='training_attendance_documents/',validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'xls', 'xlsx']),
        ], blank=True, null=True)
    assessment_upload = models.FileField(upload_to='training_assessment_documents/',validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'xls', 'xlsx']),
        ], blank=True, null=True)
    feedback_upload = models.FileField(upload_to='training_feedback_documents/',validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'xls', 'xlsx']),
        ], blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.training.tp_code} - {self.employee.emp_id}"
    
    class Meta:
        unique_together = ('training', 'employee')
    
    def clean(self):
        if not TrainingNomination.objects.filter(training=self.training, employee=self.employee).exists():
            raise ValidationError("Employee is not Nominated, for this training")
    
class ExternalTraining(models.Model):
    ext_program_code = models.CharField("External Program Code",help_text="If left blank, a code would be generated automatically.",
                               max_length=255, unique=True, blank=True)
    organizer = models.CharField("Name of Organizer", max_length=255)
    place = models.CharField("Place of Training", max_length=255)
    duration = models.PositiveIntegerField(help_text="Enter duration in number of Days")
    from_date = models.DateField()
    to_date = models.DateField()
    training_area = models.CharField("Training Area/Focus",max_length=255)
    document = models.FileField(upload_to='external_training_documents/',validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'xls', 'xlsx']),
        ])
    list_of_attendees = models.ManyToManyField(Employee)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"{self.ext_program_code} - {self.organizer}"
    
    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)
        if not self.ext_program_code:
            self.ext_program_code = "EXPC#"+str(self.id).zfill(5)

        super().save(*args, **kwargs)