const express = require('express');
const socket = require('socket.io');
const app = express();

const port = 3000;

const server = app.listen(port, function() {
    console.log(`Listening on port: ${port}`)
});

app.use(express.static('client'));

const sock = socket(server);

sock.on('connection', function(socket) {
    console.log(`Connection made with socket ${socket.id}`);

    // When the server recieves a chat
    socket.on('chat', function(data) {
        console.log(data)
        // emit to sendd the 'chat' event to everybody connected, including user
        sock.sockets.emit("chat", data);
    })
})