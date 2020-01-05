import time

import celery
from celery.decorators import periodic_task
from celery.task import task
from celery.task.schedules import crontab
from django.core.mail import send_mail


# http://docs.celeryproject.org/en/latest/userguide/tasks.html#task-inheritance
class BaseTask(celery.Task):
    pass

