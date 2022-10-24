//Book COnstructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("test");
});
