const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define Post Schema and Model
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  res.send('Hello World from Express-Mongoose!');
});

// GET API with pagination
app.get('/posts', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 if not provided
  const offset = parseInt(req.query.offset) || 0;
  
  try {
    const posts = await Post.find().skip(offset).limit(limit);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/posts', async (req, res) => {
  const { addCount } = req.body;
  
  try {
    const currentCount = await Post.countDocuments() || 0;
    const posts = Array.from({ length: addCount }, (_, i) => ({
      title: `Post ${currentCount + i + 1}`,
      content: `This is the content for post ${i + 1}.`
    }));
  
    await Post.insertMany(posts);
    console.log('Posts seeded successfully');
    // mongoose.connection.close();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/posts', async (req, res) => {
  try {
    await Post.deleteMany();
    console.log('All posts deleted successfully');
    res.status(200).json({ message: 'All posts deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
