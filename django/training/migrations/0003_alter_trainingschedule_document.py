# Generated by Django 4.1.7 on 2023-12-10 15:46

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0002_alter_trainingschedule_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainingschedule',
            name='document',
            field=models.FileField(upload_to='training_schedule_documents/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf', 'xls', 'xlsx'])]),
        ),
    ]