function updateBook() {
  const editIndex = document.getElementById("editIndex").value;
  const editAuthor = document.getElementById("editAuthor").value;
  const editPages = document.getElementById("editPages").value;
  const editPrice = document.getElementById("editPrice").value;

  const allBooks = JSON.parse(localStorage.getItem("books"));

  allBooks[editIndex] = {
    author: editAuthor,
    pages: editPages,
    price: editPrice,
  };

  localStorage.setItem("books", JSON.stringify(allBooks));
  window.location.href = "my_books.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const editIndex = queryParams.get("index");
  const allBooks = JSON.parse(localStorage.getItem("books"));

  document.getElementById("editIndex").value = editIndex;
  document.getElementById("editAuthor").value = allBooks[editIndex].author;
  document.getElementById("editPages").value = allBooks[editIndex].pages;
  document.getElementById("editPrice").value = allBooks[editIndex].price;

  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateBook();
  });
});

function updateBook() {
  const editIndex = document.getElementById("editIndex").value;
  const editAuthor = document.getElementById("editAuthor").value;
  const editPages = document.getElementById("editPages").value;
  const editPrice = document.getElementById("editPrice").value;

  const allBooks = JSON.parse(localStorage.getItem("books"));

  allBooks[editIndex] = {
    author: editAuthor,
    pages: editPages,
    price: editPrice,
  };

  localStorage.setItem("books", JSON.stringify(allBooks));

  window.location.href = "my_books.html";
}
