import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fortune.settings")
import django

django.setup()

from telling_app.models import Book, Quotes
from quote import quote


def create_book_list(quotes_data):
    author = quotes_data[0]['author']
    book_title = quotes_data[0]['book'] 
    book = Book(author=author, book=book_title)
    book.save()
    for el in quotes_data:
        quote = Quotes(book=book, quote=el["quote"])
        quote.save()
        
    print("CREATED")

create_book_list(quote("Looking for Alaska", limit=10))
