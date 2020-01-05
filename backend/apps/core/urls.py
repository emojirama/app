from django.urls import path

from . import views

urlpatterns = [
    path(
        '',
        views.home,
        name="home"
    ),
    path(
        'hello-world',
        views.hello_world,
        name="hello-world"
    ),
    path(
        'debug/redis/',
        views.DebugRedis.as_view({
            "get": "get",
            "post": "post",
            "delete": "delete"
        }),
        name="debug-redis"
    ),

]
