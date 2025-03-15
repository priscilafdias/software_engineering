document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".container").style.opacity = "1"; // Fade-in effect

    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop form submission initially

            let valid = true;
            let emailField = form.querySelector("input[name='email']");
            let passwordField = form.querySelector("input[name='password']");
            let email = emailField.value.trim();
            let password = passwordField.value.trim();

            clearErrors(form); // Clear previous errors

            // Validate email format (only @gmail.com allowed)
            if (!validateEmail(email)) {
                showError(emailField, "Invalid email format. Use example@gmail.com");
                valid = false;
            }

            // Password validation
            if (form.parentElement.id === "register-form") {
                // Strong password check for registration
                if (!validateStrongPassword(password)) {
                    showError(passwordField, "Password must be at least 8 chars, include uppercase, lowercase, number, and special character.");
                    valid = false;
                }
            } else {
                // Basic password check for login (at least 6 chars)
                if (password.length < 6) {
                    showError(passwordField, "Password must be at least 6 characters.");
                    valid = false;
                }
            }

            // ✅ Redirect ONLY if validation passes
            if (valid) {
                if (form.parentElement.id === "register-form") {
                    window.location.href = "home.html"; // Redirect to home after registration
                } else {
                    window.location.href = "home.html"; // Redirect to index after login
                }
            }
        });
    });
});

// ✅ Function to validate email format (Only @gmail.com emails allowed)
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
}

// ✅ Function to validate strong passwords (for registration)
function validateStrongPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// ✅ Function to show error messages
function showError(input, message) {
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("error");
    errorDiv.textContent = message;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

// ✅ Function to clear previous error messages
function clearErrors(form) {
    let errors = form.querySelectorAll(".error");
    errors.forEach((error) => error.remove());
}

// ✅ Function to toggle login/register form
function toggleForm(formType) {
    document.getElementById("login-form").style.display = formType === "login" ? "block" : "none";
    document.getElementById("register-form").style.display = formType === "register" ? "block" : "none";
}

function guestLogin() {
    // Redirect the user to the home page
    window.location.href = "home.html";
}
