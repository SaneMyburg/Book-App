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
      },
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
    UI.clearFields();
});

// Remove Book 
document.querySelector('.my-books').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    console.log(e.target);
});
