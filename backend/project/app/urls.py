from django.urls import path
from .views import loginview

urlpatterns=[
path('login/',loginview,name='loginview')    
]