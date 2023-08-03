from django.contrib import admin
from django.urls import path,re_path,include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    #urls de autenticacion
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    
    # urls de categorias
    path('api/category/', include('apps.category.urls')),
    
    # urls del blog
    path('api/blog/', include('apps.blog.urls')),
    
    path('ckeditor/', include('ckeditor_uploader.urls')),
    
    path('admin/', admin.site.urls),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
