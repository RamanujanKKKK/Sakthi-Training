# Generated by Django 4.1.7 on 2023-12-10 15:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainingschedule',
            name='name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='training.trainingtype'),
        ),
    ]
