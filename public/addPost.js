// async newFormHandler prevent Default
async function newFormHandler(event){
    event.preventDefault();

    // querySelector title and postText
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postText = document.querySelector('input[name="post-text"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            postTitle,
            postText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // check response ok then redirect to /dashboard
    if (response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// addEventListern submit newFormHandler
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
