"""
Utility functions for tests
"""

from datetime import datetime, timedelta

import jwt
from channels.db import database_sync_to_async
from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken


from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

EMAIL = "admin@company.com"
PASSWORD = "5Mr6IUPOFjuL"


def token_for_new_user(email=None, password=None):
    user = User.objects.create_user(
        email=email, password=password
    )
    token = AccessToken.for_user(user)
    return token


def login(email=None, password=None):
    if not email and not password:
        email, password = EMAIL, PASSWORD
    client = APIClient()
    token = token_for_new_user(email, password)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    return client


@database_sync_to_async
def channels_login(email=None, password=None):
    if not email and not password:
        email, password = EMAIL, PASSWORD
    return token_for_new_user(email, password)
