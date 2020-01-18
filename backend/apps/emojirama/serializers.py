from rest_framework import serializers

from .models import Emojirama


class EmojiramaSerializer(serializers.ModelSerializer):

    board = serializers.SerializerMethodField()

    def get_board(self, obj):
        try:
            return obj.board["scenes"]["default"]["data"]
        except KeyError:
            first_scene = [*obj.board["scenes"].keys()][0]
            return obj.board["scenes"][first_scene]["data"]

    class Meta:
        model = Emojirama
        fields = ["id", "board"]
