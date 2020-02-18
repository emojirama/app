import random

import factory

from django.contrib.auth import get_user_model

from . import models
from .utils.generation import generate_grid_data
from apps.accounts.model_factory import UserFactory


class EmojiramaFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Emojirama

    board = {
        "scenes": {
            "default": {
                "data": generate_grid_data(dimensions=[5, 5])
            }
        }
    }
    owner = factory.SubFactory(UserFactory)
