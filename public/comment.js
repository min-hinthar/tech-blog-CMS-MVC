// async commentFormHandler(event)
async function commentFormHandler(event){
    event.preventDefault();

    // querySelector textArea and store as commentText
    const commentText = document.querySelector('textArea[name="comment-body"]').value.trim();

    // use postID as body for method: POST
    const postID = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    // check if commentText and POST to /comments
    if (commentText){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postID,
                commentText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // check if response is ok then reload page
        if (response.ok){
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

// addEventListener on submit
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);