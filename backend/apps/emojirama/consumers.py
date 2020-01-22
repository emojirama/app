import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

from apps.emojirama.models import Emojirama

from .utils.redis import (
    get_emojirama_from_redis,
    update_square_in_redis,
    write_emojirama_to_redis,
)

r = settings.REDIS


class CoreConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.emojirama_id = self.scope["url_route"]["kwargs"][
            "emojirama_id"
        ]

        self.emojirama = f"emojirama_{self.emojirama_id}"
        self.user = self.scope["user"]
        print("connecting")

        # Join emojirama
        await self.channel_layer.group_add(
            self.emojirama, self.channel_name
        )
        # if there are no keys for emojirama we want
        # load data from Postgres into redis
        if not r.keys(f"emojirama___{self.emojirama_id}___*"):
            await self.load_data_to_redis()

        await self.accept()

        emojirama = await self.get_emojirama()
        await self.send(
            text_data=json.dumps(get_emojirama_from_redis(emojirama))
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json["type"]
        message = text_data_json["message"]

        if message_type == "update_square":
            await self.update_square(message)

    async def update_square(self, message):
        _ = update_square_in_redis(self.emojirama_id, message)
        await self.channel_layer.group_send(
            self.emojirama, {"type": "updated", "message": message}
        )

    async def updated(self, event):
        message = event["message"]
        await self.send(
            text_data=json.dumps(
                {"message": message, "type": "updated"}
            )
        )

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.emojirama, self.channel_name
        )
        # additional logic for redis cleanup

    @database_sync_to_async
    def load_data_to_redis(self):
        emojirama = Emojirama.objects.get(id=self.emojirama_id)
        write_emojirama_to_redis(emojirama)
        return emojirama

    @database_sync_to_async
    def get_emojirama(self):
        return Emojirama.objects.get(id=self.emojirama_id)
