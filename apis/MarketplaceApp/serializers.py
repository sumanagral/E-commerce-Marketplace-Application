from rest_framework import serializers

from MarketplaceApp.models import Items, FavItems


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ('itemId', 'price', 'name', 'condition', 'ph', 'address', 'filename', 'email')


class FavitemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavItems
        fields = ('userId', 'fitemId')
