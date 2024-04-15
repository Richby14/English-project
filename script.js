document.getElementById('commentForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        comment: formData.get('comment')
    };

    // Send data to server
    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(comment => {
        // Corrected function call
        comments(comment);
    })
    .catch(error => console.error('Error:', error));
});

function comments(comment) {
    const commentsContainer = document.getElementById('comments');
    const commentElement = document.createElement('div');
    commentElement.textContent = `${comment.name}: ${comment.comment}`;
    commentsContainer.appendChild(commentElement);
}
