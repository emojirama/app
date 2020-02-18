from rest_framework import serializers

from apps.accounts.serializers import UserSerializer
from .models import Emojirama


class CurrentUserDefault(object):
    def set_context(self, serializer_field):
        if not serializer_field.context[
            "request"
        ].user.is_anonymous:
            self.user = serializer_field.context["request"].user
        self.user = None

    def __call__(self):
        return self.user

    def __repr__(self):
        return unicode_to_repr("%s()" % self.__class__.__name__)


class EmojiramaSerializer(serializers.ModelSerializer):

    board = serializers.JSONField()
    id = serializers.IntegerField(required=False)
    owner = serializers.HiddenField(default=CurrentUserDefault())
    owner_profile = serializers.SerializerMethodField()

    def get_owner_profile(self, obj):
        if obj.owner:
            serializer = UserSerializer(obj.owner)
            return serializer.data
        return None

    # def get_board(self, obj):
    #     try:
    #         return obj.board["scenes"]["default"]["data"]
    #     except KeyError:
    #         first_scene = [*obj.board["scenes"].keys()][0]
    #         return obj.board["scenes"][first_scene]["data"]

    class Meta:
        model = Emojirama
        fields = ["id", "board", "owner", "owner_profile"]
