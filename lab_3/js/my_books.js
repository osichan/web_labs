let isSorted = false;

document.addEventListener("DOMContentLoaded", function () {
  const allBooks = JSON.parse(localStorage.getItem("books"));

  if (allBooks) {
    const contentDiv = document.getElementById("content_2");

    allBooks.forEach(function (book, index) {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book-block");
      bookDiv.innerHTML = `
          <h3><strong>Author:</strong>${book.author}</h3>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Price:</strong> ${book.price}</p>
          <button class="btn-edit" onclick="openEditScreen(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteBook(${index})">Delete</button>
          `;
      contentDiv.appendChild(bookDiv);
    });
  }
});

function deleteBook(index) {
  const allBooks = JSON.parse(localStorage.getItem("books"));

  allBooks.splice(index, 1);

  localStorage.setItem("books", JSON.stringify(allBooks));

  window.location.reload();
}

function sortBooksByPrice() {
  let allBooks = JSON.parse(localStorage.getItem("books"));
  const sortButton = document.getElementById("sortButton");
  if (!isSorted) {
    allBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    sortButton.style.backgroundColor = "lightblue";
    isSorted = true;
  } else {
    sortButton.style.backgroundColor = "";
    isSorted = false;
  }

  const contentDiv = document.getElementById("content_2");

  contentDiv.innerHTML = "";

  allBooks.forEach(function (book, index) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-block");
    bookDiv.innerHTML = `
    <h3><strong>Author:</strong>${book.author}</h3>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Price:</strong> ${book.price}</p>
    <button class="btn-edit" onclick="openEditScreen(${index})">Edit</button>
    <button class="btn-delete" onclick="deleteBook(${index})">Delete</button>
    `;
    contentDiv.appendChild(bookDiv);
  });
}

function countTotalPrice() {
  const allBooks = JSON.parse(localStorage.getItem("books"));

  if (allBooks) {
    let totalPrice = 0;

    allBooks.forEach(function (book) {
      totalPrice += parseFloat(book.price);
    });
    const totalPriceContainer = document.getElementById("totalPrice");
    totalPriceContainer.innerHTML = `<p><strong>Total Price:</strong> ${totalPrice}₴</p>`;
  }
}

function searchBooks() {
  const allBooks = JSON.parse(localStorage.getItem("books"));
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  if (allBooks) {
    const filteredBooks = allBooks.filter(function (book) {
      return book.author.toLowerCase().includes(searchInput);
    });

    const contentDiv = document.getElementById("content_2");

    contentDiv.innerHTML = "";

    if (filteredBooks.length > 0) {
      filteredBooks.forEach(function (book, index) {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-block");
        bookDiv.innerHTML = `
        <h3><strong>Author:</strong>${book.author}</h3>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <button class="btn-edit" onclick="openEditScreen(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteBook(${index})">Delete</button>
        `;
        contentDiv.appendChild(bookDiv);
      });
    } else {
      contentDiv.innerHTML = "<p>No matching books found.</p>";
    }
  }
}

function openEditScreen(index) {
  const allBooks = JSON.parse(localStorage.getItem("books"));
  const book = allBooks[index];

  const queryParams = `?index=${index}`;

  window.location.href = `edit_book.html${queryParams}`;
}
