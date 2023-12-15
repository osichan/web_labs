document.addEventListener("DOMContentLoaded", function () {
  let allBooks = [];
  let isSorted = false;
  const totalPriceContainer = document.getElementById("totalPrice");
  const contentDiv = document.getElementById("content_2");
  const sortButton = document.getElementById("sortButton");
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const countButton = document.getElementById("countButton");

  async function loadBooks() {
    allBooks = (await getBooksRequest()) || [];

    displayBooks(allBooks);
  }

  function displayBooks(books) {
    contentDiv.innerHTML = "";

    if (books.length > 0) {
      books.forEach(function (book) {
        const bookDiv = createBookElement(book);
        contentDiv.appendChild(bookDiv);
      });
    } else {
      contentDiv.innerHTML = "<p>No books available.</p>";
    }
  }

  function createBookElement(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-block");
    bookDiv.innerHTML = `
      <h3><strong>Author:</strong>${book.author}</h3>
      <p><strong>Pages:</strong> ${book.numberOfPages}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <button class="btn-edit" >Edit</button>
      <button class="btn-delete">Delete</button>
    `;
    const deleteButton = bookDiv.querySelector(".btn-delete");
    const editButton = bookDiv.querySelector(".btn-edit");

    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
    });
    editButton.addEventListener("click", function () {
      window.location.href = `edit_book.html?id=${book.id}`;
    });
    return bookDiv;
  }

  async function deleteBook(id) {
    if (await deleteBookRequest(id)) {
      await loadBooks();
    } else {
      alert("bad connection");
    }
  }

  function sortBooksByPrice() {
    if (!isSorted) {
      const sortedBooks = allBooks.slice();
      sortedBooks.sort((a, b) => a.price - b.price);
      sortButton.style.backgroundColor = "lightblue";
      isSorted = true;
      displayBooks(sortedBooks);
    } else {
      sortButton.style.backgroundColor = "";
      isSorted = false;
      displayBooks(allBooks);
    }
  }

  function searchBooks() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredBooks = allBooks.filter(function (book) {
      return book.author.toLowerCase().includes(searchValue);
    });

    contentDiv.innerHTML = "";

    if (filteredBooks.length > 0) {
      displayBooks(filteredBooks);
    } else {
      contentDiv.innerHTML = "<p>No matching books found.</p>";
    }
  }
  function countTotalPrice() {
    let totalPrice = 0;
    allBooks.forEach(function (book) {
      totalPrice += parseFloat(book.price);
    });
    totalPriceContainer.innerHTML = `<p><strong>Total Price:</strong> ${totalPrice}₴</p>`;
  }

  sortButton.addEventListener("click", sortBooksByPrice);
  searchButton.addEventListener("click", searchBooks);
  countButton.addEventListener("click", countTotalPrice);

  loadBooks();
});
