import uuid
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.dialects.postgresql import UUID
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@db:5432/booksproject'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Book(db.Model):
  __tablename__ = 'books'

  id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
  title = db.Column(db.String(100), nullable=False)
  author = db.Column(db.String(50), nullable=False)
  read = db.Column(db.Boolean, nullable=False, default=False)

class BookSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Book

book_schema = BookSchema()

with app.app_context():
  db.create_all()

@app.route('/api/book', methods=['POST'])
def create_book(): 
  try:
    data = request.get_json()
    new_book = Book(title=data['title'], author=data['author'], read=data['read'])
    db.session.add(new_book)
    db.session.commit()
    result = book_schema.dump(new_book)
    return jsonify({'data':result}), 201
  except Exception as e:
    return jsonify({'error': str(e)}), 500

@app.route('/api/books', methods=['GET'])
def get_books():
  try:
    books = Book.query.all()
    result = book_schema.dump(books, many=True)
    return jsonify({'data': result}), 200
  except Exception as e:
    return jsonify({'error': str(e)}), 500
    
@app.route('/api/book/<uuid:book_id>', methods=['PUT'])
def update_book(book_id):
  try:
    book = Book.query.get_or_404(book_id)
    if book:
      data = request.get_json()
      book.title = data['title']
      book.author = data['author']
      book.read = data['read']

      db.session.commit()
      result = book_schema.dump(book)
      return jsonify({'data': result}), 200     
    return jsonify({'error': 'book not found'}), 404
  except Exception as e:
    return jsonify({'error': str(e)}), 500
    
@app.route('/api/book/<uuid:book_id>', methods=['DELETE'])
def delete_book(book_id):
  try:
    book = Book.query.get_or_404(book_id)
    if book:
      db.session.delete(book)
      db.session.commit()
      return jsonify({'data': 'Book deleted successfully'}), 200
    return jsonify({'error': 'book not found'}), 404
  except Exception as e:
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)
