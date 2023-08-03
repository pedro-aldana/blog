from django.db import models
from django.db.models.query import QuerySet
from django.utils import timezone
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
import uuid
from apps.category.models import Category

from django.conf import settings
User = settings.AUTH_USER_MODEL



def blog_thumbnail_directory(instance,filename):
    return 'blog/{0}/{1}'.format(instance.title,filename)



class Post(models.Model):
    
    class PostObject(models.Manager):
        def get_queryset(self) -> QuerySet:
            return super().get_queryset().filter(status='published')
    
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    
    title = models.CharField(max_length=255,blank=True,null=True)
    slug = models.SlugField(max_length=255,unique=True, default=uuid.uuid4)
    thumbnail = CloudinaryField(blank=True,null=True)
    
    author =        models.ForeignKey(User, on_delete=models.CASCADE)
    
    
    description = models.TextField(max_length=255,blank=True,null=True)
    content = RichTextField(blank=True,null=True)
    time_read = models.IntegerField(blank=True,null=True)
    published = models.DateTimeField(default=timezone.now)
    views = models.IntegerField(default=0,blank=True)
    
    status = models.CharField(max_length=10,choices=options,default='draft')
    
    url =         models.CharField(max_length=500, blank=True, null=True)
    
    category = models.ForeignKey(Category, on_delete=models.PROTECT, blank=True, null=True)
    
    objects = models.Manager()
    postobjects = PostObject()   
    
    
    class Meta:
        ordering = ('-published',)
    
    def __str__(self) -> str:
        return self.title  
    
    
    def get_view_count(self):
        views = ViewCount.objects.filter(post=self).count()
        return views  
    
    
    def get_status(self):
        status = self.status
        return status    
    

class ViewCount(models.Model):
    post = models.ForeignKey(Post,related_name='category_view_count',on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)
    
    def __str__(self) -> str:
        return f"{self.ip_address}"    
            