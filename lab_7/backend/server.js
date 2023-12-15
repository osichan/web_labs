const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SQLpassword",
  database: "web_lab_6",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/api/books", upload.single("file"), (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      res.json(results);
    }
  });
});

app.post("/api/books", upload.single("file"), (req, res) => {
  const { author, number_of_pages, price, image } = req.body;
  db.query(
    "INSERT INTO books (author, number_of_pages, price, image) VALUES (?, ?, ?, ?)",
    [author, number_of_pages, price, image],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error inserting data into the database");
      } else {
        res.status(201).json({ id: result.insertId });
      }
    }
  );
});

app.put("/api/books/:id", upload.single("file"), (req, res) => {
  const { id } = req.params;
  const { author, number_of_pages, price, image } = req.body;
  db.query(
    "UPDATE books SET author = ?, number_of_pages = ?, price = ? image = ?, WHERE id = ?",
    [author, number_of_pages, price, image, id],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error updating data in the database");
      } else {
        res.json({ message: "Book updated successfully" });
      }
    }
  );
});

app.delete("/api/books/:id", upload.single("file"), (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error deleting data from the database");
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
