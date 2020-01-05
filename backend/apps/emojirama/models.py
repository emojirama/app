from django.db import models
from django.contrib.postgres.fields import JSONField
from django.conf import settings

# Create your models here.

class Emojirama(models.Model):
    board = JSONField()
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        related_name='owner',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ('id',)
