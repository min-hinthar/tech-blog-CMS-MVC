// async editFormHandler(event)
async function editFormHandler(event){
    event.preventDefault();

    // use path id to fetch method: PUT
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    // querySelector postTitle and postText for update
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postText = document.querySelector('input[name="post-text"]').value;

    // response fetch with id, method: PUT
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postText
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // check if response ok and redirect to /dashboard
    if (response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// addEventListener on submit 
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);