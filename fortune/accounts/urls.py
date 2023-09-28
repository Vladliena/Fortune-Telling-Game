from django.urls import path, include
from . import views

urlpatterns = [
    path("login/", views.sign_in, name="login"),
    path("logout/", views.sign_out, name="logout"),
    path("register/", views.sign_up, name="register"),
    path('telling_app/', include('telling_app.urls'))
]
