from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets


class CardViewSet2(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [AllowAny]
    queryset = Card.objects.all()


class AuthCardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print("auth user:", user)
        return Card.objects.all().filter(owner=user)

class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    permission_classes = [AllowAny]
    #queryset = Card.objects.all()
    def get_queryset(self):
        searchName = self.request.query_params.get("name")
        print(searchName)
        if (searchName == ""):
            print("OnLoad")
            return Card.objects.all()
        else:
            print(searchName)
            return Card.objects.all().filter(name=searchName)