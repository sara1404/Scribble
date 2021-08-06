let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let pressed = false;
let currX = null, currY = null, lastX = null, lastY = null;
let notMyTurn = false;

function getColor() {
    return document.querySelector('input[type=color]').value;
}

function getStrokeSize() {
    return document.querySelector('input[type=range').value;
}

function drawStreamedContent({ lastX, currX, lastY, currY, distance, color, strokeSize }) {
    this.lastX = lastX;
    this.lastY = lastY;
    this.currY = currY;
    this.currX = currX;
    draw(currX, currY, strokeSize, color);
    if(distance > strokeSize) {
        drawSmooth(strokeSize, color);
    }
}

let count = document.getElementById('clock');

let brushSize = document.getElementById('brush-size');
let pickedBrushSize = document.getElementById('brush-range');


function changeBrushSize(size){
    brushSize.style.width = (size*2) + 'px';
    brushSize.style.height = (size*2) + 'px';
}

function changeBrushColor(color){
    
    brushSize.style.backgroundColor = color;
}

function clearCanvas(){
    context.fillStyle = "White";
    context.beginPath();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    context.fill();
}

function fillCanvas(){
    let color = document.querySelector('input[type=color]').value;
    console.log(color);
    context.fillStyle = color;
    context.beginPath();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.closePath();
    context.fill();
}

function startClock(intervalSize){
    let clock = setInterval(function(){
        if(intervalSize == 0) return clearInterval(clock);
        intervalSize--;
        count.innerHTML = intervalSize;
    }, 1000);
}



function calculateDistance() {
    if(currX == null || currY == null || lastX == null || lastY == null) return;

    let a = Math.abs(currX - lastX);
    let b = Math.abs(currY - lastY);
    let result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return result;
}
function draw(x, y, strokeSize, color){
    context.fillStyle = color;
    context.beginPath();
    context.ellipse(x, y, strokeSize, strokeSize, 0, 0, 2*Math.PI);
    context.fill();
}


function drawSmooth(strokeSize, color) {
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(currX, currY);
    context.strokeStyle = color;
    context.lineWidth = 2 * strokeSize;
    context.stroke();
    context.closePath();
}


canvas.addEventListener('mousedown', (e) => {
    if(notMyTurn) return;
    pressed = true;
    lastX = currX;
    lastY = currY;
    currX = e.offsetX;
    currY = e.offsetY;
    draw(currX, currY, getStrokeSize(), getColor());
});

canvas.addEventListener('mousemove', (e) => {
    if(!pressed || notMyTurn) return;
    lastX = currX;
    lastY = currY;
    currX = e.offsetX;
    currY = e.offsetY;
    let distance = calculateDistance();
    let strokeSize = getStrokeSize();
    let color = getColor();
    draw(currX, currY, strokeSize, color);
    if(distance > strokeSize) {
        drawSmooth(strokeSize, color);
    }
    socket.emit('new drawing', { lastX, currX, lastY, currY, color, strokeSize, distance, roomId})
});

canvas.addEventListener('mouseup', (e) => {
    pressed = false;
});

canvas.addEventListener('mouseout', (e) => {
    pressed = false;
});