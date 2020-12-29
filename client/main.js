const socket = io.connect("http://localhost:3000");

var message = document.getElementById("message");
var userName = document.getElementById("userName");
var sendBtn = document.getElementById("send");
var messages = document.getElementById("messages");
var typing = document.getElementById("typing");

// Event listener for sending a chat message
sendBtn.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        userName: userName.value
    });
});

// Event listener when a user is typing a chat
message.addEventListener('keypress', function() {
    socket.emit('typing', userName.value);
});

// Event listener when user stops typing
message.addEventListener('blur', function() {
    socket.emit('stoppedTyping');
})

// Listen for chat events
socket.on('chat', function(data) {
    messages.innerHTML += "<p><strong>" + data.userName + ": </strong>" + data.message + "</p>";
})

// Listen for when a user types
socket.on('typing', function(data) {
    typing.innerHTML = `<p><em>${data} is typing...</em></p>`;
})

socket.on('stoppedTyping', function() {
    typing.innerHTML = '';
})