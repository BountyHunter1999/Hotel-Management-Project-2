from django.urls import path
from base.views import product_views as views



urlpatterns = [
    path('', views.getProducts, name='products'),
    path('foods/', views.getFoods, name='foods'),
    path('rooms/', views.getRooms, name='rooms'),
    path('create/', views.createProduct, name='product-create'),
    path('upload/', views.uploadImage, name='image-upload'),
    path('upload2/', views.uploadImageII, name='image-upload-2'),
    path('upload3/', views.uploadImageIII, name='image-upload-3'),

    path('top/', views.getTopProducts, name='top-products'),
    path('topRooms/', views.getTopRooms, name='top-rooms'),
    path('topFoods/', views.getTopFoods, name='top-foods'),
    path('<str:pk>/reviews/', views.createProductReview, name='create-review'),

    path('<str:pk>', views.getProduct, name='product'),
    path('update/<str:pk>/', views.updateProduct, name='product-update'),
    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),
]