"""
Utility functions for tests
"""

from datetime import datetime, timedelta

import jwt
from django.conf import settings
from rest_framework_simplejwt.tokens import AccessToken


from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


def login():
    client = APIClient()
    email, password = 'admin@company.com', '5Mr6IUPOFjuL'
    user = User.objects.create_user(email=email, password=password)
    token = AccessToken.for_user(user)
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    return client
