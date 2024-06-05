from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory list to store books
books = []
next_id = 1

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books', methods=['POST'])
def add_book():
    global next_id
    data = request.get_json()
    if 'title' not in data or 'author' not in data:
        return jsonify({'error': 'Missing title or author'}), 400
    book = {
        'id': next_id,
        'title': data['title'],
        'author': data['author']
    }
    books.append(book)
    next_id += 1
    return jsonify(book), 201

@app.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books
    books = [book for book in books if book['id'] != book_id]
    return jsonify({'message': 'Book deleted'})

if __name__ == '__main__':
    app.run(debug=True)
