const { response } = require("express");

// async deleteFormHandler(event)
async function deleteFormHandler(event){
    event.preventDefault();

    // use path id to fetch method: delete
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // check if response ok then redirect to /dashboard
    if (response.ok){
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText);
    }
};

// addEventListener on click
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);