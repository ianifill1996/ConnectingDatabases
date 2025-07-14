import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;
const uri = process.env.MONGO_URI;

app.get('/', async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').command({ ping: 1 }); // ping test
    res.json({ message: 'Successfully connected to the database!' });
    await client.close();
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ message: 'Failed to connect to the database.' });
  }
});

app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
