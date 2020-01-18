from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .models import Emojirama
from .serializers import EmojiramaSerializer


class EmojiramaViewSet(viewsets.ViewSet):

    def delete(self, request, pk):
        emojirama = Emojirama.objects.get(pk=pk)
        emojirama.delete()
        # TODO
        # delete all redis keys
        # remove users from live WS connection groups
        return Response("emojirama deleted")

    def post(self, request):
        print("using viewset")
        emojirama = Emojirama(
            board=request.data,
            owner=request.user
        )
        emojirama.save()
        return Response("saved!!")

    def get(self, request, pk):
        emojirama = Emojirama.objects.get(pk=pk)
        # TODO: return entire instance, not just board
        # use serializer
        return Response(emojirama.board)

    def save(self, request, pk):
        print("using viewset")
        emojirama = Emojirama.objects.get(pk=pk)
        emojirama.board = request.data
        emojirama.save()
        return Response("OK..")

    def list_emojiramas(self, request):
        paginator = LimitOffsetPagination()
        emojiramas = Emojirama.objects.all()
        result_page = paginator.paginate_queryset(
            emojiramas, request
        )
        serializer = EmojiramaSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def new_emojirama(self, request):
        print("using viewset")
        # TODO: remove this and generate initial scene
        # from frontend with options
        blank_grid = [
            [
                {
                    "emoji": "",
                    "tone": 1,
                    "color": "#ffffff",
                    "position": [j, i]
                } for i in range(40)
            ] for j in range(40)
        ]

        emojirama = Emojirama(
            board={
                "scenes": {
                    "default": {
                        "data": blank_grid
                    }
                }
            },
            owner=request.user
        )
        emojirama.save()
        print(emojirama.id)
        return Response({"id": emojirama.id})
