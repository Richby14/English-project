const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Endpoint to handle form submission and save comments to a file
app.post('/comments', (req, res) => {
    const { name, email, comment } = req.body;
    const newComment = { name, email, comment };

    // Load existing comments
    let comments = [];
    try {
        const commentsData = fs.readFileSync('comments.json', 'utf8');
        comments = JSON.parse(commentsData);
    } catch (err) {
        console.error('Error reading comments file:', err);
    }

    // Add the new comment to the array
    comments.push(newComment);

    // Write comments back to the file
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.error('Error saving comment:', err);
            res.status(500).json({ error: 'Failed to save comment' });
        } else {
            console.log('Comment saved:', newComment);
            res.json(newComment);
        }
    });
});

// Endpoint to retrieve comments from the file
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading comments file:', err);
            res.status(500).json({ error: 'Failed to read comments' });
        } else {
            const comments = JSON.parse(data);
            res.json(comments);
        }
    });
});

// Serve the project.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
