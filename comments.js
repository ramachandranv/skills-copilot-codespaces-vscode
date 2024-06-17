// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Create comments array
const comments = [];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Create comment
app.post('/comments', (req, res) => {
    comments.push({
        id: comments.length + 1,
        body: req.body.body
    });
    res.status(201).json(comments[comments.length - 1]);
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
        return;
    }
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found');
        return;
    }
    comment.body = req.body.body;
    res.json(comment);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});