from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .utils.generation import generate_grid_data
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
        emojirama = Emojirama(
            board=request.data,
            owner=request.user
        )
        emojirama.save()
        return Response("saved!!")

    def get(self, request, pk):
        emojirama = Emojirama.objects.get(pk=pk)
        serializer = EmojiramaSerializer(emojirama)
        return Response(serializer.data)

    def save(self, request, pk):
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
        # TODO: remove this and generate initial scene
        # from frontend with options

        board = {
            "scenes": {
                "default": {
                    "data": generate_grid_data()
                }
            }
        }
        owner=request.user

        serializer = EmojiramaSerializer(data={ "board": board,"owner": owner })
        if serializer.is_valid():
            serializer.save()
            return Response({"id": serializer.data["id"]})
        return Response("not saved...")
