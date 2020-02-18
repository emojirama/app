from rest_framework import viewsets, status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .models import Emojirama
from .serializers import EmojiramaSerializer
from .permissions import EmojiramaPermissions


class EmojiramaViewSet(viewsets.ViewSet):

    permission_classes = (EmojiramaPermissions,)

    def delete(self, request, pk):
        emojirama = Emojirama.objects.get(pk=pk)
        self.check_object_permissions(request, emojirama)
        emojirama.delete()
        # TODO
        # delete all redis keys
        # remove users from live WS connection groups
        return Response("emojirama deleted")

    def get(self, request, pk):
        emojirama = Emojirama.objects.get(pk=pk)
        self.check_object_permissions(request, emojirama)
        serializer = EmojiramaSerializer(emojirama)
        return Response(serializer.data)

    def save(self, request, pk):
        emojirama = Emojirama.objects.get(pk=pk)
        self.check_object_permissions(request, emojirama)
        serializer_data = {"board": request.data}
        serializer = EmojiramaSerializer(
            emojirama, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            data=serializer.data, status=status.HTTP_200_OK
        )

    def list_emojiramas(self, request):
        paginator = LimitOffsetPagination()
        emojiramas = Emojirama.objects.all()
        result_page = paginator.paginate_queryset(
            emojiramas, request
        )
        serializer = EmojiramaSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def new_emojirama(self, request):

        board = request.data
        serializer = EmojiramaSerializer(
            context={"request": request}, data={"board": board},
        )
        if serializer.is_valid():
            serializer.save()
            return Response({"id": serializer.data["id"]})
        return Response("not saved...")
