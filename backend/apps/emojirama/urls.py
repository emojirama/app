from django.urls import path

from . import views

urlpatterns = [
    path(
        'emojirama/',
        views.list_emojirama,
        name="list_emojirama"
    ),
    path(
        'emojirama/save/',
        views.save_emojirama,
        name="save_emojirama"
    ),
    path(
        'emojirama/new/',
        views.new_emojirama,
        name="new_emojirama"
    ),
    path(
        'emojirama/<int:id>/',
        views.get_emojirama,
        name="get_emojirama"
    )
]