from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Order, OrderItem, ShippingAddress, Review

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True) # for our serializer method
    _id = serializers.SerializerMethodField(read_only=True) # for our custom id
    isAdmin = serializers.SerializerMethodField(read_only=True) # changing how it looks
    class Meta:
        model = User
        # fields = []
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):# for field name
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_isAdmin(self, obj):# for field name
        return obj.is_staff

    def get__id(self, obj):# for field name
        return obj.id

class UserSerializerWithToken(UserSerializer): # first register, reset user info 
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self,obj): # object of actual user
        print("obj",obj)
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        # fields = []
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        # fields = []
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all() # reviews ma product parent xa tyo parent ho obj
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        # fields = []
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        # fields = []
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        # fields = []
        fields = '__all__'

    def get_orderItems(self, obj): # obj is the order object
        items  = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj): # obj is the order object
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data # being 1-1 realtionship
        except:
            address = False
        return address

    def get_user(self, obj): # obj is the order object
        user  = obj.user # getting the parent from order
        serializer = UserSerializer(user, many=False)
        return serializer.data
    

    

