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

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const messageInput = form.querySelector("textarea[name='message']");
        const message = messageInput.value.trim();

        if (message) {
            // Get current time in hh:mm AM/PM format
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Create new message div and append to chat box
            const newMessage = document.createElement("div");
            newMessage.classList.add("message");
            newMessage.innerHTML = `
                <p class="sender">You:</p>
                <p>${message} <span class="timestamp">${timeString}</span></p>
            `;
            chatMessages.appendChild(newMessage);

            // Send the message to the backend via POST request
            const sender_id = 1; // Replace with actual sender ID (could be session or logged in user ID)
            const receiver_id = 2; // Replace with actual receiver ID (could be a selected user)

            // Send message to the server
            fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_id: sender_id,
                    receiver_id: receiver_id,
                    content: message,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Message sent to the server');
                    } else {
                        console.error('Failed to send message');
                    }
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });

            // Clear input and scroll to bottom
            messageInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });

    // Fetch messages from server
    fetch('/admin/messages')
        .then(res => res.json())
        .then(messages => {
            messages.forEach(msg => {
                const msgDiv = document.createElement("div");
                msgDiv.classList.add("message");

                const sender = msg.sender_id === 1 ? 'Admin' : 'User';
                const timestamp = new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                msgDiv.innerHTML = `
                    <p class="sender">${sender}:</p>
                    <p>${msg.content}</p>
                    <small>${timestamp}</small>
                `;

                chatMessages.appendChild(msgDiv);
            });

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(error => console.error("Failed to load messages:", error));
});
