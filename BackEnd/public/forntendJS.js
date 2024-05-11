function showLoginForm(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the login and register forms
    var loginForm = document.getElementById('grid-container-div2');
    var registerForm = document.getElementById('grid-container-div3');

    // Check if the forms exist
    if (loginForm && registerForm) {
        // Show the login form and hide the register form
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

function showRegisterForm(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the login and register forms
    var loginForm = document.getElementById('grid-container-div2');
    var registerForm = document.getElementById('grid-container-div3');

    // Check if the forms exist
    if (loginForm && registerForm) {
        // Show the register form and hide the login form
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Add an event listener to the register button
var registerButton = document.getElementById('griditem3div2');
if (registerButton) {
    registerButton.addEventListener('click', showRegisterForm);
}

// Add an event listener to the login button
var loginButton = document.getElementById('loginBox');
if (loginButton) {
    loginButton.addEventListener('click', showLoginForm);
}

// Add an event listener to the login link at the top of the page
var loginLink = document.getElementById('topLoginLink');
if (loginLink) {
    loginLink.addEventListener('click', showLoginForm);
}


function openNewQuestionDialog() {

    event.preventDefault();
    // Get the form
    var form = document.getElementById('grid-container-div5i');

    // Check if the form exists
    if (form) {
        // Show the form
        form.style.display = 'block';
    }
}

function closeNewQuestionDialog() {
    // Get the form
    var form = document.getElementById('grid-container-div5i');

    // Check if the form exists
    if (form) {
        // Hide the form
        form.style.display = 'none';
    }
}

// Add an event listener to the "Ask New Question" button
var askButton = document.getElementById('griditem4i');
if (askButton) {
    askButton.addEventListener('click', openNewQuestionDialog);
}

// Add an event listener to the "X" button
var closeButton = document.getElementById('griditem2div5i');
if (closeButton) {
    closeButton.addEventListener('click', closeNewQuestionDialog);
}


// Global variable to hold the array of questions
let questions = [];

// Function to retrieve the list of questions from the server
function getQuestions() {
    fetch('http://localhost:3000/questions?_sort=createdAt&_order=desc')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestions();
        })
        .catch(error => console.error('Error:', error));
}

// Function to display the questions on the page
function showQuestions() {
    // Get the container where the questions will be displayed
    var container = document.getElementById('questionsContainer');

    // Check if the container exists
    if (container) {
        // Clear the container
        container.innerHTML = '';

        // Loop through the questions and create the necessary HTML
        questions.forEach(question => {
            var questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <h2>${question.title}</h2>
                <p>${question.description}</p>
                <p>Asked by: ${question.author.username}</p>
                <p>Asked on: ${new Date(question.createdAt).toLocaleDateString()}</p>
            `;
            container.appendChild(questionElement);
        });
    }
}

// Function to sort the questions
function sortQuestions(criteria) {
    if (criteria === 'Newest') {
        questions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (criteria === 'Oldest') {
        questions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (criteria === 'Most Answered') {
        questions.sort((a, b) => b.answers.length - a.answers.length);
    }

    // Call showQuestions to update the page
    showQuestions();
}

// Function to filter the displayed questions
function filterQuestions(criteria) {
    let filteredQuestions = questions;

    if (criteria === 'Answered') {
        filteredQuestions = questions.filter(question => question.answered);
    } else if (criteria === 'Unanswered') {
        filteredQuestions = questions.filter(question => !question.answered);
    }

    // Call showQuestions to update the page
    showQuestions(filteredQuestions);
}

// Add event listeners to the dropdown menus
window.onload = function() {
    var sortDropdown = document.getElementById('griditem1');
    var filterDropdown = document.getElementById('griditem2');

    if (sortDropdown) {
        sortDropdown.addEventListener('change', function() {
            sortQuestions(this.value);
        });
    }

    if (filterDropdown) {
        filterDropdown.addEventListener('change', function() {
            filterQuestions(this.value);
        });
    }

    // Call getQuestions when the page loads
    getQuestions();
};


// Function to validate the login form
function validateLoginForm(event) {
    event.preventDefault();

    // Get the form data
    let email = document.getElementById('Email').value;
    let password = document.getElementById('Password').value;

    // Validate that all fields are required
    if (!email || !password) {
        alert('All fields are required');
        return;
    }

    // Send the form as a POST request
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // If the response is unsuccessful, alert the user to use the correct email and password
            alert('Please use the correct email and password');
        } else {
            // On successful response, store the response in localStorage with user key
            localStorage.setItem('user', JSON.stringify(data));

            // Hide the login link in the header
            document.getElementById('topLoginLink').style.display = 'none';

            // Navigate to index.html
            window.location.href = 'index.html';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Add an event listener to the login form
var loginForm = document.getElementById('griditem7div2');
if (loginForm) {
    loginForm.addEventListener('submit', validateLoginForm);
}

// Add an event listener for page load
window.onload = function() {
    // Check the localStorage for the user key
    var user = localStorage.getItem('user');

    // If the user key exists, hide the login link in the header
    if (user) {
        var loginLink = document.getElementById('topLoginLink');
        if (loginLink) {
            loginLink.style.display = 'none';
        }
    }
};


// Function to validate the registration form
function validateRegisterForm(event) {
    event.preventDefault();

    // Get the form data
    let email = document.getElementById('Email').value;
    let password = document.getElementById('Password').value;
    let fullName = document.getElementById('Full Name').value;
    let bio = document.getElementById('Bio').value;

    // Validate that all fields are required except the profile picture
    if (!email || !password || !fullName || !bio) {
        alert('All fields are required except the profile picture');
        return;
    }

    // Send the form as a POST request
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName, bio }),
    })
    .then(response => response.json())
    .then(data => {
        // On successful response, store the response in localStorage with user key
        localStorage.setItem('user', JSON.stringify(data));

        // Hide the login link in the header
        document.getElementById('loginLink').style.display = 'none';

        // Navigate to index.html
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Function to validate the new question form
function validateNewQuestionForm(event) {
    event.preventDefault();

    // Get the form data
    let title = document.getElementById('Title').value;
    let details = document.getElementById('Details').value;
    let tags = document.getElementById('Tags').value.split(',');

    // Validate that all fields are required
    if (!title || !details || !tags) {
        alert('All fields are required');
        return;
    }

    // Get the user information from the LocalStorage if it exists otherwise use id=1 and username=Anonymous
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { id: 1, username: 'Anonymous' };

    // Send the form as a POST request
    fetch('http://localhost:3000/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, details, tags, author: user, createdAt: new Date().toISOString(), answered: false, answers: [] }),
    })
    .then(response => response.json())
    .then(data => {
        // On successful response, add the new question to the questions array and update the page
        questions.push(data);
        showQuestions();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}












