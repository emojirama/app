from django.urls import path

from . import views

urlpatterns = [
    path(
        'emojirama/',
        views.EmojiramaViewSet.as_view({
            "get": "list_emojiramas",
            "post": "post"
        })
    ),
    path(
        'emojirama/<int:pk>/',
        views.EmojiramaViewSet.as_view({
            "get": "get",
            "delete": "delete",
            "post": "save"
        })
    ),
    path(
        'emojirama/new/',
        views.EmojiramaViewSet.as_view({
            "post": "new_emojirama"
        })
    )
]
