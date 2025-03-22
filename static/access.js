document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".container").style.opacity = "1"; // Fade-in effect

    // Handle registration form submission
    const registerForm = document.querySelector("#register-form form"); // Select the register form
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting normally

            let valid = true;
            const emailField = registerForm.querySelector("input[name='email']");
            const passwordField = registerForm.querySelector("input[name='password']");
            const firstnameField = registerForm.querySelector("input[name='firstname']");
            const lastnameField = registerForm.querySelector("input[name='lastname']");
            
            const email = emailField.value.trim();
            const password = passwordField.value.trim();
            const firstname = firstnameField.value.trim();
            const lastname = lastnameField.value.trim();

            clearErrors(registerForm); // Clear any previous error messages

            // Validate the form fields
            if (!validateEmail(email)) {
                showError(emailField, "Invalid email format.");
                valid = false;
            }

            if (password.length < 6) {
                showError(passwordField, "Password must be at least 6 characters.");
                valid = false;
            }

            if (firstname.length === 0 || lastname.length === 0) {
                showError(firstnameField, "Firstname and Lastname are required.");
                showError(lastnameField, "Firstname and Lastname are required.");
                valid = false;
            }

            if (valid) {
                const formData = new FormData(registerForm);

                // Log form data to verify it's being captured correctly
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }

                fetch(registerForm.action, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Server response:", data); // Log the response from the server
                    if (data.message === 'User registered successfully') {
                        // Show success message
                        document.getElementById("success-message").style.display = "block";
                        setTimeout(() => {
                            window.location.href = "home"; // Redirect to home after success
                        }, 2000);
                    } else {
                        alert("Error: " + data.message); // Show error message
                    }
                })
                .catch(error => {
                    console.error("Error during registration:", error);
                    alert("An error occurred while registering. Please try again.");
                });
            }
        });
    }

    // Handle login form submission (similarly to registration)
    const loginForm = document.querySelector("#login-form form"); // Select the login form
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting normally

            let valid = true;
            const emailField = loginForm.querySelector("input[name='email']");
            const passwordField = loginForm.querySelector("input[name='password']");
            const email = emailField.value.trim();
            const password = passwordField.value.trim();

            clearErrors(loginForm); // Clear any previous error messages

            // Validate the form fields
            if (!validateEmail(email)) {
                showError(emailField, "Invalid email format.");
                valid = false;
            }

            if (password.length < 6) {
                showError(passwordField, "Password must be at least 6 characters.");
                valid = false;
            }

            if (valid) {
                const formData = new FormData(loginForm);

                // Log form data to verify it's being captured correctly
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }

                fetch(loginForm.action, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Server response:", data); // Log the response from the server
                    if (data.message === 'Login successful') {
                        window.location.href = "home"; // Redirect to home page on successful login
                    } else {
                        alert("Error: " + data.message); // Show error message
                    }
                })
                .catch(error => {
                    console.error("Error during login:", error);
                    alert("An error occurred while logging in. Please try again.");
                });
            }
        });
    }
});

// Function to validate email format (Only @gmail.com emails allowed)
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
}

// Function to show error messages
function showError(input, message) {
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

// Function to clear previous error messages
function clearErrors(form) {
    let errors = form.querySelectorAll(".error");
    errors.forEach((error) => error.remove());
}

// Function to toggle between login and register forms
function toggleForm(formType) {
    document.getElementById("login-form").style.display = formType === "login" ? "block" : "none";
    document.getElementById("register-form").style.display = formType === "register" ? "block" : "none";
}

function guestLogin() {
    window.location.href = "home"; // Redirect the user to the home page
}
