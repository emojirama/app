import json

from rest_framework import serializers

from .models import Emojirama

class EmojiramaSerializer(serializers.ModelSerializer):

    board = serializers.SerializerMethodField()

    def get_board(self, obj):
        return obj.board["scenes"]["default"]["data"]

    class Meta:
        model = Emojirama
        fields = ["id", "board"]
