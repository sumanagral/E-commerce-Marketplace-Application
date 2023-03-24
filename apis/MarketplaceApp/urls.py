from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path as url

from MarketplaceApp import views

urlpatterns = [
                  url(r'^item$', views.itemApi),
                  url(r'^item/([0-9]+)$', views.itemApi),
                  url(r'^item/saveImage', views.saveImage),
                  url(r'^favitem$', views.favitemApi),
                  url(r'^favitem/([A-z]+)$', views.favitemApi),
                  url(r'^search/$', views.searchApi),
                  # url(r'^favitem/([0-9]+)$',views.favitemApi),
                  # url(r'^favitem/([A-z]+)/([0-9]+)$',views.favitemApi)
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
