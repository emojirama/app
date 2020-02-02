from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path(
        "ws/emojirama/<int:emojirama_id>/", consumers.CoreConsumer
    ),
    # url(r'^ws/chat/(?P<room_name>[^/]+)/$', consumers.CoreConsumer),
]
