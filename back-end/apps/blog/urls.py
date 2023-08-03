from django.urls import path

from .views import *


urlpatterns = [
    path('list',BlogListView.as_view()),
    path('by_category',ListPostByCategoryView.as_view()),
    path('detail/<slug>',PostDetailView.as_view()),
    path('search',SearchBlogView.as_view()),
    
    # vista para filtrar post por author
    path('author_list',AuthorBlogListView.as_view()),
    
    path('edit',EditPostView.as_view()),
    path('draft',DraftBlogPostView.as_view()),
    path('publish',PublishBlogPostView.as_view()),
    path('delete/<slug>',DeleteBlogPostView.as_view()),
    path('create',CreateBlogPostView.as_view()),
    
]