from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Post,ViewCount
from slugify import slugify
from apps.category.models import Category
from .serializers import PostSerializer,PostListSerializer
from .pagination import SmallSetPagination,MediumSetPagination,LargeSetPagination
from django.db.models.query_utils import Q
from .permissions import isPostAuthorOrReadOnly,AuthorPermission
from rest_framework.parsers import MultiPartParser,FormParser

class BlogListView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,format=None):
        
        if Post.postobjects.all().exists():
            
            post = Post.postobjects.all()
            
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(post,request)
            
            serializer = PostListSerializer(results, many=True)
            return paginator.get_paginated_response({'post': serializer.data})
        else:
            return Response({'error': 'No post found'}, status=status.HTTP_404_NOT_FOUND)
        

class ListPostByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self,request,format=None):
        if Post.postobjects.all().exists():
            
            slug = request.query_params.get('slug')
            category = Category.objects.get(slug=slug)  
            
            post = Post.postobjects.order_by('-published').all()
            
            # filtrar categoria sola
            if not Category.objects.filter(parent=category).exists():
                post = post.filter(category=category)
            # si esta categoria padre tiene hijos, filtrar por la categoria padres y sus hijos
            else:
                sub_categories = Category.objects.filter(parent=category)
                
                filtered_categories = [category]
                
                for cat in sub_categories:
                    filtered_categories.append(cat)
                
                filtered_categories = tuple(filtered_categories)
                post = post.filter(category__in=filtered_categories)    
                  
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(post, request)
            serializer = PostListSerializer(results, many=True)
            
            return paginator.get_paginated_response({'post': serializer.data})
        
        else:
            return Response({'error': 'No Post found'}, status=status.HTTP_404_NOT_FOUND)      
        
        

class PostDetailView(APIView):
    def get(self,request,slug,format=None):
        if Post.objects.filter(slug=slug).exists():
            
            post = Post.objects.get(slug=slug)
            serializer = PostSerializer(post)
            
            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')
                
            if not ViewCount.objects.filter(post=post, ip_address=ip):
                view= ViewCount(post=post,ip_address=ip)
                view.save()
                post.views += 1
                post.save()   
            
            return Response({'post': serializer.data})
        else:
            return Response({'error': 'post doesnt exist'},status=status.HTTP_404_NOT_FOUND)               
        
        

class SearchBlogView(APIView):
    
    permission_classes = (permissions.AllowAny,)
    def get(self,request,format=None):
        search_term = request.query_params.get('s')
        matches = Post.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )
        
        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)
        
        serializer = PostListSerializer(results, many=True)
        return paginator.get_paginated_response({'filtered_posts': serializer.data})
                     
                     

class AuthorBlogListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self,request,format=None):
        
        user = self.request.user
        
        if Post.objects.filter(author=user).exists():
            
            post = Post.objects.filter(author=user)
        
            paginator = SmallSetPagination()
            result = paginator.paginate_queryset(post,request)   
            serializer = PostListSerializer(result, many=True)
            
            return paginator.get_paginated_response({'post': serializer.data})
        else:
            return Response({'error': 'No posts found'}, status=status.HTTP_404_NOT_FOUND)                  
        
        
class EditPostView(APIView):
    permission_classes = (isPostAuthorOrReadOnly, )
    parser_classes = [MultiPartParser,FormParser]
    
    def put(self, request, format=None):
        user = self
        
        data = self.request.data
        slug = data['slug']
       
        post = Post.objects.get(slug=slug)
        
        if(data['title']):
            if not (data['title'] == 'undefined'):
                post.title = data['title']
                post.save()
        if(data['new_slug']):
            if not (data['new_slug'] == 'undefined'):
                post.slug = slugify(data['new_slug'])
                post.save()
        if(data['description']):
            if not (data['description'] == 'undefined'):
                post.description = data['description']
                post.save()
        if(data['time_read']):
            if not (data['time_read'] == 'undefined'):
                post.time_read = data['time_read']
                post.save()
        if(data['content']):
            if not (data['content'] == 'undefined'):
                post.content = data['content']
                post.save()

        if(data['category']):
            if not (data['category'] == 'undefined'):
                category_id = int(data['category'])
                category = Category.objects.get(id=category_id)
                post.category = category
                post.save()

        if(data['thumbnail']):
            if not (data['thumbnail'] == 'undefined'):
                post.thumbnail = data['thumbnail']
                post.save()

       
        return Response({'succes': 'Post Edited'})
        

class DraftBlogPostView(APIView):
    permission_classes = (isPostAuthorOrReadOnly, )
    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'draft'
        post.save()

        return Response({'success': 'Post edited'})
    

class PublishBlogPostView(APIView):
    permission_classes = (isPostAuthorOrReadOnly, )
    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'published'
        post.save()

        return Response({'success': 'Post edited'})    
    
    

class DeleteBlogPostView(APIView):
    permission_classes = (isPostAuthorOrReadOnly, )
    def delete(self, request, slug, format=None):
        
        post = Post.objects.get(slug=slug)

        post.delete()

        return Response({'success': 'Post edited'})
    
    
class CreateBlogPostView(APIView):
    permission_classes = (AuthorPermission, )
    def post(self, request, format=None):
        user = self.request.user
        Post.objects.create(author=user)

        return Response({'success': 'Post edited'})        