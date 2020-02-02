import pytest

from django.contrib.auth import get_user_model
from django.test import TestCase  # noqa
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.core.tests.utils import login

User = get_user_model()


class UsersManagersTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            email="normal@user.com", password="foo"
        )
        self.assertEqual(user.email, "normal@user.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(ValueError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(
            "super@user.com", "foo"
        )
        self.assertEqual(admin_user.email, "super@user.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email="super@user.com",
                password="foo",
                is_superuser=False,
            )


class AccountsTests(APITestCase):
    def test_obtain_jwt(self):

        url = reverse("api-jwt-auth")

        u = User.objects.create_user(
            email="user@foo.com", password="password"
        )
        u.is_active = False
        u.save()

        resp = self.client.post(
            url,
            {"email": "user@foo.com", "password": "password"},
            format="json",
        )
        self.assertEqual(
            resp.status_code, status.HTTP_401_UNAUTHORIZED
        )
        u.is_active = True
        u.save()
        resp = self.client.post(
            url,
            {"email": "user@foo.com", "password": "password"},
            format="json",
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue("access" in resp.data)


@pytest.mark.django_db(transaction=True)
def test_user_profile():
    client = login()
    profile = {"emoji": {"code": "boy", "skin": 3}}
    client.post(
        reverse("user-profile"),
        data={"profile": profile},
        format="json",
    )

    assert (
        User.objects.all().first().profile["emoji"]["code"]
        == "boy"
    )
