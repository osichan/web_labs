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
  database: "web_lab_12",
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
  const { author, number_of_pages, price, image } = req.query;

  let sql = "SELECT * FROM books WHERE 1=1";
  const params = [];

  if (author) {
    sql += " AND author LIKE ?";
    params.push(`%${author}%`);
  }
  if (number_of_pages) {
    sql += " AND number_of_pages LIKE ?";
    params.push(`%${number_of_pages}%`);
  }

  if (price) {
    sql += " AND price LIKE ?";
    params.push(`%${price}%`);
  }
  if (image) {
    sql += " AND image = ?";
    params.push(image);
  }

  db.query(sql, params, (err, results) => {
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
  console.log(req.body);
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

app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error retrieving data from the database");
    } else {
      if (results.length === 0) {
        res.status(404).send("Book not found");
      } else {
        res.json(results[0]);
      }
    }
  });
});

app.post("/api/register", upload.single("file"), async (req, res) => {
  const { email, password, first_name, second_name } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // If email doesn't exist, proceed to register the user
      db.query(
        "INSERT INTO users (email, password, first_name, second_name) VALUES (?, ?, ?, ?)",
        [email, password, first_name, second_name],
        (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          res.json({ message: "Registration successful" });
        }
      );
    }
  );
});

app.post("/api/login", upload.single("file"), (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      res.json({ message: "Authentication successful" });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
