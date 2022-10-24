class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    //create tr element
    const row = document.createElement("tr");
    //insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    //create div
    const div = document.createElement("div");
    //add class
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    //insert alert
    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Local Storage Class
class Store {
  static getBooks() {
    let books = [];
    if (localStorage.getItem("books") !== null) {
      books.push(JSON.parse(localStorage.getItem("books")));
    }

    return books;
  }

  static displayBooks() {}

  static addBook() {
    getBooks();
  }

  static removeBook() {}
}

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  //validate
  if (!title || !author || !isbn) {
    //error alert
    return ui.showAlert("Please Fill In All Fields", "error");
  }

  //add book to list
  ui.addBookToList(book);

  //Add to local storage
  Store.addBook(book);

  ui.showAlert("Book Added", "success");

  //clear fields
  ui.clearFields();
});

//Event Listener for delete
document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();

  //instantiate UI
  const ui = new UI();
  ui.deleteBook(e.target);

  //show alert
  ui.showAlert("Book Deleted", "success");
});
