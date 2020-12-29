const socket = io.connect("http://localhost:3000");

var messages = document.getElementById("messages");
var userName = document.getElementById("userName");
var sendBtn = document.getElementById("send");
var messages = document.getElementById("messages");

// Event listener for sending a chat message
sendBtn.addEventListener('click', function() {
    console.log('sending chat')
    socket.emit('chat', {
        message: message.value,
        userName: userName.value
    });
});

// Listen for chat events
socket.on('chat', function(data) {
    messages.innerHTML += "<p><strong>" + data.userName + ": </strong>" + data.message + "</p>";
})