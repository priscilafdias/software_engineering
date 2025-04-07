// Function to redirect to the /user page
function goToChatPage() {
    window.location.href = "/user"; // This will redirect to the /user page (user.pug)
}

// Function to open the chat window
function openChatWindow() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.classList.remove("hidden");
    chatWindow.style.display = "flex"; // show chat window
}

// Function to close the chat window
function closeChatWindow() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.classList.add("hidden");
    chatWindow.style.display = "none"; // hide chat window
}

// Send message functionality
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const chatMessages = document.querySelector(".chat-messages");

    if (!form || !chatMessages) {
        console.error("Form or chatMessages not found!");
        return;
    }

    // Find the input field and the submit button
    const messageInput = form.querySelector("textarea[name='message']");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const messageInput = form.querySelector("textarea[name='message']");
        const message = messageInput.value.trim(); // Ensure message is trimmed

        if (message) {
            // Create a new message div to display in the chat window
            const newMessage = document.createElement("div");
            newMessage.classList.add("message");

            const timestamp = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            newMessage.innerHTML = `
              <p class="sender">You:</p>
              <p>${message}</p>
              <small>${timestamp}</small>
            `;

            chatMessages.appendChild(newMessage); // Append the new message to chat window

            // Send the message to the server via fetch
            fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: 2, // User is sending the message
                    receiver_id: 1, // Admin is the receiver
                    content: message, // The message content
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Message sent to server");
                } else {
                    console.error("Failed to send message");
                    alert("Failed to send message, please try again.");
                }
            })
            .catch(error => {
                console.error("Error sending message:", error);
                alert("Error sending message, please try again.");
            });

            // Clear the input field after sending
            messageInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom of the chat
        }
    });

    // Fetch and display messages when the page loads
    fetch('/user/messages')
        .then(response => response.json())
        .then(messages => {
            messages.forEach(msg => {
                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message");

                const sender = msg.sender_id === 2 ? 'User' : 'Admin'; // 'You' for the user
                const timestamp = new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                messageDiv.innerHTML = `
                    <p class="sender">${sender}:</p>
                    <p>${msg.content}</p>
                    <small>${timestamp}</small>
                `;

                chatMessages.appendChild(messageDiv);
            });

            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(error => {
            console.error("Failed to load messages:", error);
        });
});
