class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'My Perfect Life',
                author: 'Sane Myburg',
            },
            {
                title: 'Shazam',
                author: 'Zoe Myburg',
            }
        ];

        const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('.my-books');
        const allBooks = document.createElement('div');
        
        allBooks.innerHTML = `
        <p>${book.title}</p>
        <p>By</p>
        <p>${book.author}</p>
        <button id="remove-book">Remove</button>
        `;
        list.appendChild(allBooks);
    }
}

// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
