from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime
import pytz

import requests

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1) Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod= data['paymentMethod'],
            shippingPrice = data['shippingPrice'],
            discountPrice = data['discountPrice'],
            totalPrice = data['totalPrice']
        )
        # 2) Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            shippingPrice = data['shippingPrice']
            # if needed added shippingPrice here too
        )
        # 3) Create order items and set the order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name=product.name,
                qty= i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # 4) Update the stock if Room
            if product.isRoom:
                product.countInStock -= item.qty
                product.save()
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer =OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not Authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many = True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    print("REQYEST IS:", request.data)
    order = Order.objects.get(_id=pk)

    # tz_NP = pytz.timezone('Asia/Kathmandu') 
    # datetime_NY = datetime.now(tz_NP)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.paymentMethod = request.data['paymentMethod']
    order.save()
    return Response('Order was paid')


# for update order delivered
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    
    order = Order.objects.get(_id=pk)

    # tz_NP = pytz.timezone('Asia/Kathmandu') 
    # datetime_NY = datetime.now(tz_NP)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('Order was delivered')



@api_view(['POST'])
def khaltiPay(request):
    print("Request is:", request.data)

    url = "https://khalti.com/api/v2/payment/verify/"
    payload = {
    "token": str(request.data['token']),
    "amount": request.data['amount']
    }
    headers = {
    "Authorization": "Key test_secret_key_7a8386c52267482da9f3fef8e1e2ebef"
    }

    response = requests.post(url, payload, headers = headers)
    print("RESPONSE IS ", response)
    return Response(response)


# pip install cryptocode ,done
# !apt install libzbar0
# pip install pyzbar , done
# pip install MyQR , done
# pip install pyqrcode
import cryptocode
# from MyQR import myqr as mq
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def getEncryptedData(request):
    print("request is", request.data)
    print("YOU ARE ENCRYPTED OOF")
    order_id = request.data['order_id']
    user_key = request.data['user_key']
    print("user_key ", user_key)
    companySecret = "life"
    company_encoded = cryptocode.encrypt(str(order_id), companySecret)
    print("Compnay Encoded is:",company_encoded)
    qrcode_input = cryptocode.encrypt(company_encoded, str(user_key)) # qrcode input
    print("\n QR CODE INPUT IS:" ,qrcode_input)
    
    # mq.run(words = qrcode_input,
    # version = 6,
    # # picture = 'C:/Users/mcc/Desktop/tco.jpg',
    # # colorized = True,
    # save_name = 'our.png')
    return Response(qrcode_input)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDecryptedQrCode(request):
    pass


