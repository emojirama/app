import pytest
from channels.db import database_sync_to_async
from channels.testing import WebsocketCommunicator
from django.conf import settings

from backend.routing import application

from apps.core.tests.utils import channels_login
from apps.emojirama.model_factory import EmojiramaFactory

r = settings.REDIS


@database_sync_to_async
def create_emojirama():
    emojirama = EmojiramaFactory()
    return emojirama


@database_sync_to_async
def create_emojirama():
    emojirama = EmojiramaFactory()
    return emojirama


@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
async def test_live_emojirama():
    token = await channels_login()

    emojirama = await create_emojirama()

    communicator = WebsocketCommunicator(
        application,
        f"/ws/emojirama/{emojirama.id}/",
        headers=[("Authorization", f"Bearer {token}")],
    )
    connected, subprotocol = await communicator.connect()

    assert connected

    assert len(r.keys("emojirama___1___*")) > 0

    print(emojirama.id)
    await communicator.disconnect()
