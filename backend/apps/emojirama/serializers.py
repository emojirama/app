from rest_framework import serializers

from .models import Emojirama

class EmojiramaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emojirama
        fields = ["id"]
