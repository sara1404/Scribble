let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let pressed = false;
let currX = null, currY = null, lastX = null, lastY = null;
let notMyTurn = false;
let drawing = true;
let fill = false;

function getColor() {
    return document.querySelector('input[type=color]').value;
}

function getStrokeSize() {
    return document.querySelector('input[type=range').value;
}

function drawStreamedContent(data) {
    currX = data.currX;
    currY = data.currY;
    lastX = data.lastX;
    lastY = data.lastY;
    draw(currX, currY, data.strokeSize, data.color);
    if(data.distance > data.strokeSize) {
        drawSmooth(data.strokeSize, data.color);
    }
}

let count = document.getElementById('clock');

let brushSize = document.getElementById('brush-size');
let pickedBrushSize = document.getElementById('brush-range');


function changeBrushSize(size) {
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

function switchToFill() {
    drawing = false;
}

function switchToDrawing() {
    drawing = true;
}

function convertHexToRGBA(hex) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b, 255];

}


canvas.addEventListener('click', (e) => {
    if(drawing) return;
    let color = document.querySelector('input[type=color]').value;
    let x = e.offsetX;
    let y = e.offsetY;
    let r = context.getImageData(0, 0, width, height).data[4 * (y * width + x)];
    let g = context.getImageData(0, 0, width, height).data[4 * (y * width + x) + 1];
    let b = context.getImageData(0, 0, width, height).data[4 * (y * width + x) + 2];

    fillBucket(x, y, [r, g, b, 255], convertHexToRGBA(color.substring(1)), false);
});

canvas.addEventListener('mousedown', (e) => {
    if(notMyTurn || !drawing) return;
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