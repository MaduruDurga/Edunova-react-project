from django.db import models

# Create your models here.
class Student(models.Model):
    username=models.CharField()
    email=models.EmailField(unique=True)
    password=models.CharField()
    def __str__(self):
        return self.username