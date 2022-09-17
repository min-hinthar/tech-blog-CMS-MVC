// async loginFormHandler(event)
async function loginFormHandler(event) {
    event.preventDefault();

// querySelector email-login
const email = document.querySelector('#email-login').value.trim();
// querySelector password-login
const password = document.querySelector('#password-login').value.trim();

// conditional logic to check if email & password are correct
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // redirect path /dashboard if response ok
        if (response.ok){
            document.location.replace('/dashboard');
        } else {
            alert (response.statusText);
        }
    }
};

// async signUpFormHandler(event)
async function signUpFormHandler(event){
    event.preventDefault();
    // querySelector username, email, password from Form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-login').value.trim;

    // conditional logic to check username, email and password
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // redirect path / if response ok
        if (response.ok){
            document.location.replace('/')
        } else {
            alert (response.statusText);
        }
    }
};

// addEventListener for login-form and signup-form
document.querySelector('login-form').addEventListener('submit', loginFormHandler);

document.querySelector('signup-form').addEventListener('submit', signUpFormHandler);


