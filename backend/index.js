// index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'sql_injection'
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL');
  }
});

// Vulnerable endpoint
app.get('/filter', (req, res) => {
  let category = req.query.category;

  if (!category || category.toLowerCase() === 'all') {
    // Show only released products when category is 'all' or missing
    category = '';
    const query = `SELECT * FROM PRODUCTS WHERE released = 1`;
    db.query(query, (err, results) => {
      if (err) return res.status(500).send('DB error');
      res.json(results);
    });
    return;
  }

  // WARNING: Deliberately vulnerable code — no parameterization!
  const query = `SELECT * FROM PRODUCTS WHERE category = '${category}' AND released = 1 `;

  db.query(query, (err, results) => {
    if (err) {
      // Send error to see injection effect (like syntax errors)
      return res.status(500).send('DB error: ' + err.sqlMessage);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

// LOGIN MODULE

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // WARNING: This is deliberately vulnerable to SQL Injection!
  const query = `SELECT * FROM dark_users WHERE username = '${username}' AND password = '${password}'`;

   db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.sqlMessage });
    }
    if (results.length > 0) {
      res.json({ success: true, username: results[0].username });
    } else {
      res.json({ success: false });
    }
  });
});


// Route to serve articles
app.get('/articles', (req, res) => {
  const sort = req.query.sort || 'cost ASC';
  const category = req.query.category;

  // Build query dynamically with vulnerable logic (intentional)
  let query = `SELECT title, cost, abstract, category FROM articles`;

  if (category && category !== 'all') {
    query += ` WHERE category = '${category}'`; // Vulnerable on purpose
  }

  query += ` ORDER BY ${sort}`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('DB error: ' + err.sqlMessage);
    }
    res.json(results);
  });
});

