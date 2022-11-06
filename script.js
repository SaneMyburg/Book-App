class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Storing Handling
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.my-books');
    const allBooks = document.createElement('div');

    allBooks.innerHTML = `
        <p>${book.title}</p>
        <p>By</p>
        <p>${book.author}</p>
        <button class="remove-book">Remove</button>
        `;
    list.appendChild(allBooks);
  }

  static deleteBook(element) {
    if (element.classList.contains('remove-book')) {
      element.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Adding Book
document.querySelector('#new-book').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);
  UI.addBookToList(book);
  // Adding Book to Storage
  Store.addBook(book);
  UI.clearFields();
});

// Remove Book
document.querySelector('.my-books').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.previousElementSibling.textContent);
});
