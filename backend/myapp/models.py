from django.db import models
from django.conf import settings

# Create your models here.


class Card(models.Model):
    name = models.TextField()
    description = models.TextField()
    # if we want the user id
    # owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    price = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    # if we want the username
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE)
    # owner = models.TextField()



class CartModel(models.Model):
    color = models.CharField(max_length=30)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created"]


class PageModel(models.Model):
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created"]


