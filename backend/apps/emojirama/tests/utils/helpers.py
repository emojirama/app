from channels.db import database_sync_to_async

from apps.emojirama.model_factory import EmojiramaFactory


@database_sync_to_async
def create_emojirama():
    emojirama = EmojiramaFactory()
    return emojirama
