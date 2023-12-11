document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('errorMessage').textContent = 'Passwords do not match.';
        return;
    }

    const userData = {
        name: name,
        username: username,
        password: password
    };

    fetch('http://localhost:8083/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed.');
        }
        window.location.href = '/'; // Redirect to home page
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = error.message;
    });
});