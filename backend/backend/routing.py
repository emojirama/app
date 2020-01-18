from channels.routing import ProtocolTypeRouter, URLRouter

import apps.core.routing
import apps.emojirama.routing
from apps.core.asgi_middleware import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            apps.core.routing.websocket_urlpatterns +
            apps.emojirama.routing.websocket_urlpatterns
        )
    ),
})
