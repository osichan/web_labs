document.addEventListener("DOMContentLoaded", function () {
  let allBooks = [];
  const queryParams = new URLSearchParams(window.location.search);
  const editId = queryParams.get("id");
  const editAuthorInput = document.getElementById("editAuthor");
  const editPagesInput = document.getElementById("editPages");
  const editPriceInput = document.getElementById("editPrice");

  async function loadBooks() {
    allBooks = (await getBooksRequest()) || [];
    const bookToEdit = allBooks.find((element) => element.id == editId);
    editAuthorInput.value = bookToEdit.author;
    editPagesInput.value = bookToEdit.numberOfPages;
    editPriceInput.value = bookToEdit.price;
  }

  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateBook();
  });

  async function updateBook() {
    const author = editAuthorInput.value;
    const numberOfPages = editPagesInput.value;
    const price = editPriceInput.value;

    await updateBookRequest({ author, numberOfPages, price, id: editId });

    window.location.href = "my_books.html";
  }

  loadBooks();
});
