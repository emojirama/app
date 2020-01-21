"""
Tests for CRUD operations on emojirama
"""

import pytest

from apps.emojirama.models import Emojirama
from apps.emojirama.model_factory import EmojiramaFactory
from apps.core.tests.utils import login

from django.urls import reverse

@pytest.mark.django_db(transaction=True)
def test_new_emojirama_route():
    client = login()
    client.post(reverse('new-emojirama'))
    assert Emojirama.objects.all().count() == 1
