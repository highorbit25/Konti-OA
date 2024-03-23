const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// We store posts in posts.json to persist data
let posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'));

// We store last_id in metadata.json to keep track of the last post id
let metadata = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
let last_id = metadata.last_id;

app.get('/posts', (req, res) => {
    // Return all posts in response
    res.json(posts);
});

app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    
    // If post not found, return 404
    if (!post) return res.status(404).send('Post not found');

    // Return requested post in response
    res.json(post);
});

app.post('/posts', (req, res) => {
    const post = {
        id: last_id + 1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);

    // Save posts to JSON file
    fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));

    // Update the last_id in metadata.json
    fs.writeFileSync('metadata.json', JSON.stringify({ last_id: last_id++ }, null, 2));

    // Return created post in response
    res.status(201).json(post);
});

app.patch('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    // Save posts to JSON file
    fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));

    // Return updated post in response
    res.json(post);
});

app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');
    const deletedPost = posts.splice(postIndex, 1);

    // Save posts to JSON file
    fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));

    // Return deletedPost in response
    res.json(deletedPost);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));