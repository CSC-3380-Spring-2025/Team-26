const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const db = admin.firestore();

// Routes
app.post('/posts', async (req, res) => {
  try {
    const { userId, placeName, meal, rating } = req.body;
    if (!userId || !placeName || !meal || rating === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newPost = await db.collection('posts').add({
      userId,
      placeName,
      meal,
      rating,
      likes: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: newPost.id, message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/posts/:placeName', async (req, res) => {
  try {
    const placeName = req.params.placeName;
    const postsSnapshot = await db.collection('posts').where('placeName', '==', placeName).get();
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/posts/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    const postRef = db.collection('posts').doc(postId);
    await postRef.update({ likes: admin.firestore.FieldValue.increment(1) });
    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});