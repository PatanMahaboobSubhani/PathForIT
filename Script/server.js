const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static('.'));

// SQLite database setup
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create users table if it does not exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Users table ready.');
  }
});

// Routes

// Home route - serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main-index.html'));
});

// Registration route
app.post('/register', (req, res) => {
  const { name, email, pass } = req.body;
  
  // Basic validation
  if (!name || !email || !pass) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.'
    });
  }
  
  // Insert new user
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
    [name, email, pass], 
    function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(400).json({
            success: false,
            message: 'Email already exists. Please use a different email.'
          });
        }
        return res.status(500).json({
          success: false,
          message: 'Registration failed. Please try again.'
        });
      }
      
      res.json({
        success: true,
        message: 'Registration successful!',
        userId: this.lastID
      });
    }
  );
});

// Login route
app.post('/login', (req, res) => {
  const { your_name, your_pass } = req.body;
  
  // Basic validation
  if (!your_name || !your_pass) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.'
    });
  }
  
  // Check user credentials (searching by name OR email)
  db.get('SELECT * FROM users WHERE (name = ? OR email = ?) AND password = ?', 
    [your_name, your_name, your_pass], 
    (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Login failed. Please try again.'
        });
      }
      
      if (row) {
        res.json({
          success: true,
          message: 'Login successful!',
          user: {
            id: row.id,
            name: row.name,
            email: row.email
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please check your username/email and password.'
        });
      }
    }
  );
});

// Get all users (for testing purposes)
app.get('/users', (req, res) => {
  db.all('SELECT id, name, email, created_at FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch users.'
      });
    }
    
    res.json({
      success: true,
      users: rows
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  GET  / - Main welcome page');
  console.log('  POST /register - User registration');
  console.log('  POST /login - User login');
  console.log('  GET  /users - View all users (for testing)');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});
