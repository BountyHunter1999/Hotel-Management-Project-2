from django.core import paginator
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# for home screen all products
@api_view(['GET'])
def getTopProducts(request):
    """
    -rating to get 5star first
    [0:5] to get only 5 items
    """
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5] 
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# for foods screen 
@api_view(['GET'])
def getTopFoods(request):
    """
    -rating to get 5star first
    [0:5] to get only 5 items
    """
    products = Product.objects.filter(isRoom=False).filter(rating__gte=4).order_by('-rating')[0:5] 
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# for rooms screen 
@api_view(['GET'])
def getTopRooms(request):
    """
    -rating to get 5star first
    [0:5] to get only 5 items
    """
    products = Product.objects.filter(isRoom=True).filter(rating__gte=4).order_by('-rating')[0:5] 
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    # we are editing the product in the frontend, the one this creates
    user = request.user # which admin is creating the product
    print("CREATE PRODUCT REQUEST WE GET", request.data['isRoom'])
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        countInStock=0,
        max_food_count=15,
        category='Sample Category',
        description='',
        isRoom= request.data['isRoom']
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.countInStock = data['countInStock']
    product.max_food_count = data['max_food_count']
    product.category = data['category']
    product.description = data['description']
    product.isRoom = data['isRoom']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')



@api_view(['POST'])
# @permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data

    print("DATA WHEN UPLOADING IMAGE IS:", data)
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    
    # for room only
    # if product.isRoom:
    #     product.imageII = request.FILES.get('imageII')
    #     product.imageIII = request.FILES.get('imageIII')

    product.save()
    return Response('Image was uploaded')
    
@api_view(['POST'])
# @permission_classes([IsAdminUser])
def uploadImageII(request):
    data = request.data

    print("DATA WHEN UPLOADING IMAGE IS:", data)
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    # product.image = request.FILES.get('image')
    
    # for room only
    # if product.isRoom:
    product.imageII = request.FILES.get('imageII')
    #     product.imageIII = request.FILES.get('imageIII')

    product.save()
    return Response('Image was uploaded')

@api_view(['POST'])
# @permission_classes([IsAdminUser])
def uploadImageIII(request):
    data = request.data

    print("DATA WHEN UPLOADING IMAGE IS:", data)
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    # product.image = request.FILES.get('image')
    
    # for room only
    # if product.isRoom:
    #     product.imageII = request.FILES.get('imageII')
    product.imageIII = request.FILES.get('imageIII')

    product.save()
    return Response('Image was uploaded')

@api_view(['GET'])
def getFoods(request):
    query = request.query_params.get('keyword')

    print("query foods:", query)
    if query  == None:
        query = ""
        
    products = Product.objects.all().filter(isRoom=False).filter(name__icontains=query)

    page =  request.query_params.get('page') 
    paginator = Paginator(products, 4)

    #1 if we pass page from frontend
    try:
        products = paginator.page(page)
    #2 if we didn't pass a page
    except PageNotAnInteger:
        products = paginator.page(1) # returns 1st page
    #3 if we have an empty page
    except EmptyPage:
        """
        and we won't allow a user to go over the last page
        """
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page) # if paginator send a string format page

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page': page, "pages": paginator.num_pages})

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')

    print("query:", query)
    if query  == None:
        query = ""


    # products = Product.objects.all()
    # "" matra vaya sab value ma query garxa
    products = Product.objects.filter(name__icontains=query) # case insensitive
    print("Products:", len(products))

    # filter data is what we want to paginate 
    page =  request.query_params.get('page') # gives the page number we are on
    paginator = Paginator(products, 4)

    #1 if we pass page from frontend
    try:
        products = paginator.page(page)
    #2 if we didn't pass a page
    except PageNotAnInteger:
        products = paginator.page(1) # returns 1st page
    #3 if we have an empty page
    except EmptyPage:
        """
        Pass 40 in 10 page site, the page clearly doesn't exist or have content
        we will just send the last page here
        and we won't allow a user to go over that page
        """
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page) # if paginator send a string format page

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page': page, "pages": paginator.num_pages})

@api_view(['GET'])
def getRooms(request):
    query = request.query_params.get('keyword')

    print("query rooms:", query)
    if query  == None:
        query = ""

    products = Product.objects.all().filter(isRoom=True).filter(name__icontains=query)

    page =  request.query_params.get('page') 
    paginator = Paginator(products, 3)

    #1 if we pass page from frontend
    try:
        products = paginator.page(page)
    #2 if we didn't pass a page
    except PageNotAnInteger:
        products = paginator.page(1) # returns 1st page
    #3 if we have an empty page
    except EmptyPage:
        """
        and we won't allow a user to go over the last page
        """
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    
    page = int(page) # if paginator send a string format page

    serializer = ProductSerializer(products, many=True)
    return Response({'products':serializer.data, 'page': page, "pages": paginator.num_pages})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data= request.data

    #1 Review already exists, don't allow them to spam reviews
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    #2 No Rating or 0 Rating
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3 Create review  
    else:
        review = Review.objects.create(
            user=user,
            product= product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')