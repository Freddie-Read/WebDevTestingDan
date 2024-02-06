"""
URL configuration for mysite project.
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from myapp import views
from myapp import viewsets

router = DefaultRouter()
router.register(r"cart", views.CartView, basename="cart")
router.register(r"page", views.PageView, basename="page")
router.register(r"cards", viewsets.CardViewSet, basename="card")
router.register(r"auth-cards", viewsets.AuthCardViewSet, basename="auth-card")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/login/", views.LoginView.as_view()),
    path("api/register/", views.RegisterView.as_view()),
    path("api/me/", views.AboutMeView.as_view()),
    path("api/me-session/", views.SessionAboutMeView.as_view()),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("populate/", views.populate),
    path("api/addItem/", views.CardView.as_view()),
    path("api/updatePassword/", views.ChangePasswordView.as_view())
]
urlpatterns += router.urls