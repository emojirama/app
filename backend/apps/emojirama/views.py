from .serializers import EmojiramaSerializer

from django.shortcuts import render
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
)
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .models import Emojirama
# Create your views here.


@api_view(http_method_names=["POST"])
def save_emojirama(request):
    emojirama = Emojirama(
        board=request.data,
        owner=request.user
    )
    emojirama.save()
    return Response("saved!!")

@api_view(http_method_names=["POST"])
def new_emojirama(request):
    # TODO: remove this and generate initial scene
    # from frontend with options
    blank_grid = [
        [
            {
                "emoji": "",
                "tone": 1,
                "color": "#ffffff",
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
    return Response(emojirama.board)

@api_view(["GET"])
def list_emojirama(request):
    paginator = LimitOffsetPagination()
    emojiramas = Emojirama.objects.all()
    result_page = paginator.paginate_queryset(
        emojiramas, request
    )
    serializer = EmojiramaSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)