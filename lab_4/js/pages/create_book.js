async function saveBook() {
  const author = document.getElementById("author").value;
  const numberOfPages = document.getElementById("pages").value;
  const price = document.getElementById("price").value;
  const regexPattern = /[^ ]/g;
  if (
    regexPattern.test(author) &&
    regexPattern.test(numberOfPages) &&
    regexPattern.test(price)
  ) {
    if (await addBookRequest({ author, numberOfPages, price })) {
      window.location.href = "my_books.html";
    }
  }
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
