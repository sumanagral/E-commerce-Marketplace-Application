from django.core.files.storage import default_storage
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from MarketplaceApp.models import Items, FavItems
from MarketplaceApp.serializers import ItemsSerializer, FavitemsSerializer


@csrf_exempt
def itemApi(request, id=0):
    userId = request.GET.get("userId", None)
    if request.method == 'GET':
        if userId:
            items = Items.objects.filter(email=userId)
        else:
            items = Items.objects.all()
        items_serializer = ItemsSerializer(items, many=True)
        return JsonResponse(items_serializer.data, safe=False)
    elif request.method == 'POST':
        item_data = JSONParser().parse(request)
        items_serializer = ItemsSerializer(data=item_data["ad"])
        if items_serializer.is_valid():
            items_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        item_data = JSONParser().parse(request)
        item = Items.objects.get(itemId=item_data['itemId'])
        items_serializer = ItemsSerializer(item, data=item_data)
        if items_serializer.is_valid():
            items_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        item = Items.objects.get(itemId=id)
        item.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def favitemApi(request):
    if request.method == 'GET':
        favitem = FavItems.objects.get_queryset().filter(userId=request.GET.get('userId'))
        favitem_serializer = FavitemsSerializer(favitem, many=True)
        return JsonResponse(favitem_serializer.data, safe=False)
    elif request.method == 'POST':
        fitem_data = JSONParser().parse(request)
        print(fitem_data)
        if FavItems.objects.filter(userId=fitem_data["userId"]).count() > 0:
            to_edit = FavItems.objects.get(userId=fitem_data["userId"])
            getattr(to_edit, 'fitemId').extend(fitem_data["fitemId"])
            to_edit.save()
            return JsonResponse("Added Successfully", safe=False)
        else:
            fitems_serializer = FavitemsSerializer(data=fitem_data)
            if fitems_serializer.is_valid():
                fitems_serializer.save()
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'DELETE':
        to_edit = FavItems.objects.get(userId=request.GET.get('userId'))
        item_id = int(request.GET.get('itemId'))
        getattr(to_edit, 'fitemId').remove(item_id)
        to_edit.save()
        return JsonResponse("Removed Successfully", safe=False)


@csrf_exempt
def saveImage(request):
    print(request.FILES)
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)


@csrf_exempt
def searchApi(request):
    if request.method == 'GET':
        search = request.GET.get('query')
        items = Items.objects.filter(name__icontains=search)
        items_serializer = ItemsSerializer(items, many=True)
        return JsonResponse(items_serializer.data, safe=False)
