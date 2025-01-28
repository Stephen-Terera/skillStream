import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Constants
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '30m';

// In-memory user database (replace with proper database in production)
const users = new Map();

// Middleware: Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorisation'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'API is operational' });
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (users.has(username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.set(username, {
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error whilst creating user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.get(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    res.json({ access_token: token, token_type: 'bearer' });
  } catch (error) {
    res.status(500).json({ error: 'Login error occurred' });
  }
});

app.post('/chat', authenticateToken, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Here you would integrate with your AI model
    // For now, returning a mock response
    const response = `Mock response to: ${prompt}`;
    
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Chat error occurred' });
  }
});

app.get('/analytics', authenticateToken, (req, res) => {
  // Placeholder for analytics implementation
  res.json({
    message: 'Analytics endpoint is under development',
    user: req.user.username
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something has gone wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is operational on port ${PORT}`);
});