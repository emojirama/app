from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.utils.translation import ugettext_lazy as _


from .managers import CustomUserManager


class CustomUser(AbstractUser):
    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    username = None
    email = models.EmailField(_("email address"), unique=True)
    profile = JSONField(default=dict)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
