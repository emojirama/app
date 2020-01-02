from django.shortcuts import render
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)
from rest_framework.response import Response

from .models import Emojirama
# Create your views here.


@api_view(http_method_names=["POST"])
# @authentication_classes([])
# @permission_classes([])
def save_emojirama(request):
    print(request.data)
    print(request.user.id)
    print(request.user)
    emojirama = Emojirama(
        board=request.data,
        owner=request.user
    )
    emojirama.save()
    return Response("saved!!")

@api_view(http_method_names=["POST"])
# @authentication_classes([])
# @permission_classes([])
def new_emojirama(request):
    blank_grid = [
        [
            {
                "emoji": None,
                "tone": 1,
                "color": "#ffffff", # "#222222" if (i + j) % 2 == 0 else "#666666",
                "position": [j,i]
            } for i in range(40)
        ] for j in range(40)
    ]

    emojirama = Emojirama(
        board={
            "scenes":
                {"default":
                    { "data": blank_grid
                }
            }
        },
        owner=request.user
    )
    emojirama.save()
    print(emojirama.id)
    return Response({"id": emojirama.id})

@api_view(http_method_names=["GET", "POST"])
def get_emojirama(request, id):
    if request.method == "POST":
        emojirama = Emojirama.objects.get(id=id)
        emojirama.board = request.data
        emojirama.save()
        return Response("OK..")
    emojirama = Emojirama.objects.get(id=id)
    print(emojirama.board)
    return Response(emojirama.board)
