import pytest
import requests

API_URL = 'http://127.0.0.1:4000'
book_id = ''

@pytest.fixture
def sample_book():
    return {
        'title': 'Jack Kerouac',
        'author': 'On the road',
        'read': False
    }

def test_create_book():
    book_data = sample_book()
    response = requests.post(f'{API_URL}/api/book', json=book_data)
    assert response.status_code == 201

    book_id = response.json()['message']['id']

def test_get_books():
    response = requests.get(f'{API_URL}/api/books')
    assert response.status_code == 200

def test_update_books():
    new_book_data = {**sample_book(), 'title': 'The Dharma Bums'}
    response = requests.put(f'{API_URL}/api/book/{book_id}', json=new_book_data)
    assert response.status_code == 200

def test_delete_books():
    response = requests.delete(f'{API_URL}/api/book/{book_id}')
    assert response.status_code == 200

