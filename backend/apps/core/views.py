import os

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.views.generic import TemplateView
from rest_framework import viewsets

# Serve Vue Application via template for GitLab CI
index_view = never_cache(
    TemplateView.as_view(template_name="index.html")
)

r = settings.REDIS


class DebugRedis(viewsets.ViewSet):
    def get(self, request):
        count = None

        value = r.get("cached_value")

        if value:
            print(value)
            count = value
        return JsonResponse({"count": count})

    def post(self, request):
        new_count = int(request.data["count"])
        print("setting value to cache:")
        print(new_count)
        r.set("cached_value", new_count)
        new_count = r.get("cached_value")
        print("value from cache is...")
        print(new_count)
        return JsonResponse({"count": new_count})

    def delete(self, request):
        r.delete("cached_value")
        return JsonResponse({"count": r.get("cached_value")})


def hello_world(request):
    response = JsonResponse(
        {
            "message": "Hello, World!",
            "git_sha": os.environ.get("GIT_SHA", "<git SHA>"),
            "debug": settings.DEBUG,
            "format": "JSON",
            "ssm_param": os.environ.get(
                "MY_PARAM", "param_value"
            ),
        }
    )
    return response


def home(request):
    response = JsonResponse({"message": "Root"})
    return response
