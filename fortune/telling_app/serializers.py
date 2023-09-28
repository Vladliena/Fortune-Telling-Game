from rest_framework import serializers
from .models import Book, Quotes, Questions


class BookSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Book
        fields = "__all__"
        

class QuotesSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Quotes
        fields = "__all__"
        
        
class QuestionsSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Questions
        fields = "__all__"