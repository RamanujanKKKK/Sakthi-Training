# Generated by Django 4.1.7 on 2023-12-19 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('training', '0006_trainingtype_slug'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trainingtype',
            options={'verbose_name': 'Training Topic'},
        ),
        migrations.AddField(
            model_name='trainingtype',
            name='department',
            field=models.ManyToManyField(to='training.department'),
        ),
        migrations.AlterField(
            model_name='trainer',
            name='name',
            field=models.CharField(max_length=255, verbose_name='trainer name'),
        ),
    ]