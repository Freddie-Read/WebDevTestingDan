import random

from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .serializers import (
    CartSerializer,
    ChangePasswordSerializer,
    LoginSerializer,
    RegisterSerializer,
    PageSerializer,
    UpdatePageSerializer,
    CardSerializer,
)
from django.contrib.auth.hashers import (
    check_password,
    is_password_usable,
    make_password,
)
from .models import CartModel, PageModel, Card

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
import datetime

def populate(request):
    # clearing the DB
    User.objects.all().delete()
    Card.objects.all().delete()

    #populating with no_u users and no_c cards each
    no_u = 6
    no_c = 10
    try:
        itemName_list = ['Model', 'Lamp', 'Table', 'Chair', 'Desk', 'Phone', 'Figure','Sofa','Bed','Ticket']
        itemPrice_list = ["£9.99","£19.99","£29.99","£39.99","£49.99","£59.99","£69.99","£79.99","£89.99","£99.99","£199.99","£299.99"]
        itemDescription_list = ["Placeholder Desciption1","Placeholder Desciption2","Placeholder Desciption3","Placeholder Desciption4","Placeholder Desciption5","Placeholder Desciption6"]
        for n in range(no_u):
            user = User.objects.create_user("testuser{}".format(n), "testuser{}@shop.aa".format(n), "pass{}".format(n))
            user.save()
            if (n<3):
                for i in range(no_c):
                    item = Card(name=random.choice(itemName_list), description=random.choice(itemDescription_list), price=random.choice(itemPrice_list), owner=user)
                    item.save()
                    
        message = "populated with {} users and {} cards".format(no_u, no_c)
    except Exception as e:
        message = "Populate failed:  " + str(e)
    return JsonResponse({"message": message})

class AboutMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(f"you are: {request.user.get_username()}")


class SessionAboutMeView(AboutMeView):
    authentication_classes = [authentication.SessionAuthentication]


class RegisterView(APIView):
    """
    Register a new user
    """

    serializer_class = RegisterSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        try:
            user = User.objects.create_user(
                username=serializer.data["username"],
                email=serializer.data["email"],
                password=serializer.data["password"],
            )
        except IntegrityError:
            return Response(f"same user name", status=400)
        if user is not None:
            return Response(f"new user is: {user.get_username()}")
        return Response("no new user")

class CardView(APIView):
    """
    create a new card item
    """

    def post(self, request, format=None):
        try:
            uname = request.data["User"]
            try:
                user = User.objects.all().filter(username=uname)[0]
            except:
                return Response(f"there was error", status=400)
            item = Card(
                name=request.data["ItemName"],
                description=request.data["Description"],
                price=request.data["Price"],
                owner=user,
            )
            item.save()
        except IntegrityError:
            return Response(f"there was error", status=400)
        if item is not None:
            return Response(f"new item created")
        return Response("no new item")
    
class ChangePasswordView(APIView):
    """
    UpdatePassword
    """

    def put(self, request, format=None):
        newpass = None
        try:
            # uname = request.data["userName"]
            # try:
            #     user = User.objects.all().filter(username=uname)[0]
            # except:
            #     return Response(f"there was error", status=400)
            #Verify that the password is correct.  
            #print(request.data)
            userData = request.data
            #newpass = request.data["NewPassword"]
            #userData.pop("NewPassword")
            #print(userData)
            serializer = ChangePasswordSerializer(data=userData)
            if not serializer.is_valid():
                #print("invalid")
                return Response(serializer.errors, status=400)
            #print("Valid")
            if(authenticate(username=serializer.data["username"], password=serializer.data["password"])):
                #print(newpass)
                print(serializer.data["username"],serializer.data["NewPassword"])
                newpass = make_password(serializer.data["NewPassword"])
                print(newpass)
                print("")
                user = User.objects.filter(username=serializer.data["username"])
                print(user[0].password)
                User.objects.filter(username=serializer.data["username"]).update(password=newpass)
                user = User.objects.filter(username=serializer.data["username"])
                print(user[0].password)
            else:
                print("Did not authenticate")
                newpass = None
                return Response(f"there was error", status=401)
        except IntegrityError:
            return Response(f"there was error", status=400)
        if newpass is not None:
            return Response(f"password updated")
        return Response("password not updated")

class LoginView(APIView):
    """
    Login a user
    """

    def post(self, request, format=None):
        #print(request.data)
        serializer = LoginSerializer(data=request.data)
        print(request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        user = authenticate(
            username=serializer.data["username"], password=serializer.data["password"]
        )
        if user is not None:
            login(request, user)
            return Response(f"is logged in: {user.get_username()}")
        return Response("not logged in")


class CartView(viewsets.ModelViewSet):
    queryset = CartModel.objects.all()
    serializer_class = CartSerializer


class PageView(viewsets.ModelViewSet):
    queryset = PageModel.objects.all()

    @property
    def serializer_class(self):
        if self.request.method == "PUT":
            return UpdatePageSerializer
        return PageSerializer

    def update(self, request, pk=None):
        page = self.get_object()
        serializer = self.serializer_class(page, data=request.data)
        is_valid = serializer.is_valid()
        if not is_valid:
            return Response(serializer.errors, 400)

        if serializer.validated_data["updated"] < page.updated:
            # the status code means the content is modified
            # https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
            # send back latest model instance
            return Response(self.serializer_class(page).data, 409)
        serializer.save()
        return Response(data=serializer.data)