// async logout()
async function logout(){
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // check if response ok then redirect to /
    if (response.ok){
        document.location.replace('/');
    } else {
        alert (response.statusText);
    }
};

// addEventListener on click
document.querySelector('#logout').addEventListener('click', logout);