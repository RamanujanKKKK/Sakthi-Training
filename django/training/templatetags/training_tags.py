from django import template
from training.models import *

register = template.Library()

@register.simple_tag
def get_training_departments(id):
    return TrainingType.objects.get(id=id)