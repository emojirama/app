import json
import time

from apps.emojirama.models import Emojirama
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

from .utils.redis import (
    write_emojirama_to_redis,
    get_emojirama_from_redis
)

r = settings.REDIS

class CoreConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.emojirama_id = \
            self.scope['url_route']['kwargs']['emojirama_id']
        # self.room_group_name = f'chat_{self.room_name}'
        self.emojirama = f"emojirama_{self.emojirama_id}"
        self.user = self.scope['user']
        print("connecting")
        # Join emojirama
        # print(self.channel_name) # noqa
        await self.channel_layer.group_add(
            self.emojirama,
            self.channel_name
        )
        # if there are no keys for emojirama we want
        # load data from Postgres into redis
        if not r.keys(f"{self.emojirama_id}___*"):
            await self.load_data_to_redis()

        await self.accept()

        emojirama = await self.get_emojirama()
        await self.send(
            text_data=json.dumps(
                get_emojirama_from_redis(emojirama)
            )
        )

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.ping_pong_group,
            self.channel_name
        )

        # additional logic for redis cleanup

    @database_sync_to_async
    def load_data_to_redis(self):
        print("accessing the database")
        emojirama = Emojirama.objects.get(id=self.emojirama_id)
        write_emojirama_to_redis(emojirama)
        return emojirama


    @database_sync_to_async
    def get_emojirama(self):
        return Emojirama.objects.get(id=self.emojirama_id)