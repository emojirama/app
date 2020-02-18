"""
Tests for CRUD operations on emojirama
"""

import pytest

from apps.emojirama.utils.generation import generate_grid_data
from apps.emojirama.models import Emojirama
from apps.emojirama.model_factory import EmojiramaFactory
from apps.core.tests.utils import login
from apps.accounts.model_factory import UserFactory

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient

User = get_user_model()


@pytest.mark.django_db(transaction=True)
def test_new_emojirama_route():
    client = login()
    post_data = {
        "scenes": {
            "default": {
                "data": generate_grid_data(dimensions=[5, 5])
            }
        }
    }
    client.post(
        reverse("new-emojirama"), post_data, format="json"
    )
    assert Emojirama.objects.all().count() == 1


@pytest.mark.django_db(transaction=True)
def test_list_emojirama():
    """
    Anonymous users can access emojirama list
    """
    # TODO: expand this test to include private emojirama logic
    EMAIL = "test_user@email.com"
    client = login(email=EMAIL, password="oo43fj09")
    user = UserFactory(email=EMAIL)
    emojirama_1 = EmojiramaFactory(owner=user)
    client.post(reverse("new-emojirama"))
    assert Emojirama.objects.all().count() == 2
    anonymous_client = APIClient()
    resp = anonymous_client.get(reverse("emojirama"))
    emojirama_count = resp.data["count"]
    assert resp.status_code == 200
    assert emojirama_count == 2


@pytest.mark.django_db(transaction=True)
def test_update_emojirama():
    client = login()

    resp = client.get(reverse("user-profile"))
    user = User.objects.get(id=resp.data["id"])

    emojirama = EmojiramaFactory(owner=user)

    assert len(emojirama.board["scenes"]) == 1
    assert emojirama.owner is user

    # create a new simple scene to add to the board
    new_scene = {"data": generate_grid_data(dimensions=[3, 3])}

    e = Emojirama.objects.all().first()
    emojirama_board = e.board
    emojirama_board["scenes"]["new_scene"] = new_scene

    client.post(
        reverse("emojirama-record", kwargs={"pk": e.id}),
        data=emojirama_board,
        format="json",
    )

    updated_emojirama = Emojirama.objects.get(id=e.id)

    print(updated_emojirama.board)
    assert len(updated_emojirama.board["scenes"]) == 2


@pytest.mark.django_db(transaction=True)
def test_delete_emojirama():
    client1 = login()
    client2 = login(
        email="test_delete@email.com", password="043jr4309"
    )
    resp = client1.post(reverse("new-emojirama"))
    emojirama_id = resp.data["id"]
    assert Emojirama.objects.all().count() == 1

    delete_attempt_resp = client2.delete(
        reverse("emojirama-record", kwargs={"pk": emojirama_id})
    )
    assert Emojirama.objects.all().count() == 1
    assert delete_attempt_resp.status_code == 403

    owner_detele_resp = client1.delete(
        reverse("emojirama-record", kwargs={"pk": emojirama_id})
    )

    assert owner_detele_resp.status_code == 200
    assert Emojirama.objects.all().count() == 0
