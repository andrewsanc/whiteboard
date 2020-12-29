const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const socket = require('socket.io');
const io = socket(server);

io.on('connection', onConnection);

function onConnection() {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data))
}

const port = 8081;
server.listen(port, () => consolee.log(`server is running on ${port}`));