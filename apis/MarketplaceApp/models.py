from django.db import models


class Items(models.Model):
    itemId = models.AutoField(primary_key=True)
    price = models.BigIntegerField()
    name = models.CharField(max_length=500)
    condition = models.CharField(max_length=50)
    ph = models.CharField(max_length=10)
    address = models.CharField(max_length=500)
    filename = models.CharField(max_length=50)
    email = models.CharField(max_length=200)


class FavItems(models.Model):
    userId = models.CharField(primary_key=True, max_length=200)
    fitemId = models.JSONField(models.BigIntegerField(), null=True)
