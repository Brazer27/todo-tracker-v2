import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Todo model
const { Todo } = db;

// Routes

// GET /todos - Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch todos',
      message: error.message 
    });
  }
});

// POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: 'Title is required' 
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
      description: description?.trim() || null,
      completed: false
    });

    res.status(201).json(todo);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }
    res.status(500).json({ 
      error: 'Failed to create todo',
      message: error.message 
    });
  }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Todo not found' 
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description?.trim() || null;
    if (completed !== undefined) updateData.completed = completed;

    await todo.update(updateData);

    res.json(todo);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }
    res.status(500).json({ 
      error: 'Failed to update todo',
      message: error.message 
    });
  }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByPk(id);
    
    if (!todo) {
      return res.status(404).json({ 
        error: 'Not found',
        message: 'Todo not found' 
      });
    }

    await todo.destroy();

    res.json({ 
      message: 'Todo deleted successfully',
      id: parseInt(id)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete todo',
      message: error.message 
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Todo Tracker API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
