const socket = io();

// Elements
const chatBox = document.getElementById("chat-box");
const usernameForm = document.getElementById("username-form");
const usernameInput = document.getElementById("username-input");
const privateMessageForm = document.getElementById("private-message-form");
const recipientInput = document.getElementById("recipient-input");
const messageInput = document.getElementById("message-input");

let username = "";

// Submit username to the server
usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (usernameInput.value.trim() !== "") {
    username = usernameInput.value.trim();
    socket.emit("submit_username", username);
    usernameInput.value = "";
  }
});

// Receive confirmation of username being set
socket.on("username_set", (username) => {
  showStatusMessage(`Username set: ${username}`);
});

// Show status messages on the chat box
function showStatusMessage(message) {
  const statusMessage = document.createElement("p");
  statusMessage.textContent = message;
  chatBox.appendChild(statusMessage);
}

// Receive messages from other users
socket.on("user_joined", (username) => {
  showStatusMessage(`${username} joined the chat.`);
});

socket.on("user_left", (username) => {
  showStatusMessage(`${username} left the chat.`);
});

socket.on("private_message", ({ sender, message }) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
});

// Send private message to another user
privateMessageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const recipient = recipientInput.value.trim();
  const message = messageInput.value.trim();
  if (recipient && message) {
    socket.emit("private_message", { recipient, message });
    messageInput.value = "";
  }
});
