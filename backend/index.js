const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mysql',
  connectionLimit: 10, // Adjust the connection limit as needed
});

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors());

// Get all products
app.get('/products', (req, res) => {
  pool.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Get a specific product
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newProductId = result.insertId;
      res.status(201).json({ id: newProductId, name, price });
    }
  });
});

// Update an existing product
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  pool.query(
    'UPDATE products SET name = ?, price = ? WHERE id = ?',
    [name, price, productId],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  pool.query('DELETE FROM products WHERE id = ?', [productId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});