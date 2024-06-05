const apiUrl = 'http://127.0.0.1:5000/books';

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    
    document.getElementById('add-book-btn').addEventListener('click', () => {
        const title = document.getElementById('book-title-input').value;
        const author = document.getElementById('book-author-input').value;
        if (title && author) {
            addBook(title, author);
        }
    });
});

function addBook(title, author) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Book added:', data);
        document.getElementById('book-title-input').value = '';
        document.getElementById('book-author-input').value = '';
        loadBooks();
    })
    .catch(error => console.error('Error adding book:', error));
}

function loadBooks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Books loaded:', data);
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.author}`;
                li.className = 'book-item';
                const deleteBtn = document.createElement('span');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => deleteBook(book.id);
                li.appendChild(deleteBtn);
                bookList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading books:', error));
}

function deleteBook(bookId) {
    fetch(`${apiUrl}/${bookId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Book deleted:', data);
        loadBooks();
    })
    .catch(error => console.error('Error deleting book:', error));
}
