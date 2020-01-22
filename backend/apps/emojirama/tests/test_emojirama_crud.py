"""
Tests for CRUD operations on emojirama
"""

import pytest

from apps.emojirama.models import Emojirama
from apps.emojirama.model_factory import EmojiramaFactory
from apps.core.tests.utils import login

from django.contrib.auth import get_user_model
from django.urls import reverse

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_new_emojirama_route():
    client = login()
    client.post(reverse("new-emojirama"))
    assert Emojirama.objects.all().count() == 1


@pytest.mark.django_db(transaction=True)
def test_update_emojirama():
    client = login()

    resp = client.get(reverse("user-profile"))
    user = User.objects.get(id=resp.data["id"])

    emojirama = EmojiramaFactory(owner=user)

    assert len(emojirama.board["scenes"]) == 1
    assert emojirama.owner is user

    # create a new simple scene to add to the board
    new_scene = {
        "data": [
            [
                {
                    "emoji": "elf",
                    "color": "#ffffff",
                    "position": [0, 0],
                    "tone": 1,
                }
            ]
        ]
    }

    e = Emojirama.objects.all().first()
    e.board["scenes"]["new_scene"] = new_scene

    client.post(
        f"/api/emojirama/{e.id}",
        data={"board": e.board, "owner": user.id},
        format="json",
    )

    assert len(e.board["scenes"]) == 2


@pytest.mark.django_db(transaction=True)
def test_delete_emojirama():
    client = login()
    resp = client.post(reverse("new-emojirama"))
    emojirama_id = resp.data["id"]
    assert Emojirama.objects.all().count() == 1
    client.delete(
        reverse("emojirama-record", kwargs={"pk": emojirama_id})
    )
    assert Emojirama.objects.all().count() == 0
