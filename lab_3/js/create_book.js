function saveBook() {
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const price = document.getElementById("price").value;

  const newBook = {
    author,
    pages,
    price,
  };

  let allBooks = [];

  if (localStorage.getItem("books")) {
    allBooks = JSON.parse(localStorage.getItem("books"));
  }

  allBooks.push(newBook);

  localStorage.setItem("books", JSON.stringify(allBooks));
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
