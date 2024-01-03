import pytest
import requests

API_URL = 'http://127.0.0.1:4000'

@pytest.fixture
def sample_book():
  return {
    'title': 'Jack Kerouac',
    'author': 'On the road',
    'read': False
  }

@pytest.fixture
def get_books_data(sample_book):
  book_data = sample_book
  response = requests.post(f'{API_URL}/api/book', json=book_data)
  return response

@pytest.fixture
def created_book_id(get_books_data):
  books = get_books_data
  book_id = books.json()['message']['id']
  return [book_id]

def test_get_books():
  response = requests.get(f'{API_URL}/api/books')
  assert response.status_code == 200

def test_create_book(sample_book):
  book_data = sample_book
  response = requests.post(f'{API_URL}/api/book', json=book_data)
  assert response.status_code == 201

@pytest.mark.parametrize("new_title", ["The Dharma Bums"])
def test_update_books(sample_book, get_books_data, created_book_id, new_title):
  new_book_data = {**sample_book, 'title': new_title}
  book_id = created_book_id[0]
  response = requests.put(f'{API_URL}/api/book/{book_id}', json=new_book_data)
  assert response.status_code == 200

def test_delete_books(created_book_id, get_books_data):
  book_id = created_book_id[0]
  response = requests.delete(f'{API_URL}/api/book/{book_id}')
  assert response.status_code == 200
