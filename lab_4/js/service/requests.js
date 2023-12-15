async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

async function getBooksRequest() {
  try {
    const response = await fetch("http://localhost:3000/api/books");
    const data = await handleResponse(response);
    const dataToReturn = data.map((book) => ({
      author: book.author,
      numberOfPages: book.number_of_pages,
      price: book.price,
      id: book.id,
    }));
    return dataToReturn;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function addBookRequest(bookData) {
  try {
    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      body: JSON.stringify({
        author: bookData.author,
        number_of_pages: bookData.numberOfPages,
        price: bookData.price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Error adding a book:", error);
    throw error;
  }
}

async function updateBookRequest(bookData) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/books/${bookData.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          author: bookData.author,
          number_of_pages: bookData.numberOfPages,
          price: bookData.price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Error updating the book:", error);
    throw error;
  }
}

async function deleteBookRequest(bookId) {
  try {
    const response = await fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: "DELETE",
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error("Error deleting the book:", error);
    throw error;
  }
}
