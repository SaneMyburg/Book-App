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
    allBooks.classList.add('mybooks-item');

    allBooks.innerHTML = `
        <p class="mybooks-p">${book.title}</p>
        <p class="mybooks-p">By</p>
        <p class="mybooks-p">${book.author}</p>
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

// Single page App

class Switch {
  static newPage(page) {
    const booksLibrary = document.querySelector('.books-library');
    const newBooks = document.querySelector('.new-books');
    const contactInfo = document.querySelector('.contacts');
    const bookLink = document.querySelector('#list');
    const bookAdd = document.querySelector('#add-link');
    const contactUs = document.querySelector('#contacts');

    if (page === 'List') {
      booksLibrary.style.display = 'block';
      newBooks.style.display = 'none';
      contactInfo.style.display = 'none';
     
    } else if (page === 'Add new'){
      booksLibrary.style.display = 'none';
      newBooks.style.display = 'block';
      contactInfo.style.display = 'none';
     
    
    } else {
      booksLibrary.style.display = 'none';
      newBooks.style.display = 'none';
      contactInfo.style.display = 'block';
     
    }
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
 document.querySelectorAll('.switch-link').forEach((link) => {
  link.addEventListener('click', () => {
    Switch.newPage(link.textContent)

  });
 })