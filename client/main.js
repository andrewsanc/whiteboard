const socket = io.connect("http://localhost:3000");

const message = document.getElementById("message");
const userName = document.getElementById("userName");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");
const typing = document.getElementById("typing");

// Canvas DOM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.lineWidth = '3';

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

// Canvas JS

let isActive = false;

// Array to hold our plots
let plots = [];

canvas.addEventListener('mousedown', startDraw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', endDraw, false);

// Collects plots and puts into the array 'plots', then draws on canvas
function draw(event) {
    if (!isActive) {
        return;
    }

    // Cross-browser canvas coordinates
    let x = event.offsetX || event.layerX - canvas.offsetLeft;
    let y = event.offsetY || event.layerY - canvas.offsetTop;

    plots.push({x: x, y: y});

    drawOnCanvas(plots);
    emitDrawing(plots);
}

// Draw on the canvas element
function drawOnCanvas(plots) {
    ctx.beginPath();
    ctx.moveTo(plots[0].x, plots[0].y);

    plots.forEach((plot) => {
        ctx.lineTo(plot.x, plot.y);
    });
    ctx.stroke();
}

function startDraw(event) {
    isActive = true;
}

function endDraw(event) {
    isActive = false;

    // Empty plots array
    plots = [];
}

// Sends plots of drawings to the server
function emitDrawing(plots) {
    socket.emit('draw', plots);
}

// Listen for drawing plots
socket.on('draw', function(data) {
    drawOnCanvas(data);
})