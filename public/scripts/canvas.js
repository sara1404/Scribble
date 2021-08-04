let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let pressed = false;
let currX=null, currY=null, lastX=null, lastY=null;

function calculateDistance() {
    if(currX == null || currY == null || lastX == null || lastY == null) return;
    console.log(currX,currY,lastX, lastY);
    let a = Math.abs(currX - lastX);
    let b = Math.abs(currY - lastY);
    let result = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return result;
}
function draw(x, y){
    context.fillStyle = document.getElementById('color-picker-palette').value;
    let strokeSize = document.querySelector('input[type=range]').value;
    context.beginPath();
    context.ellipse(x, y, strokeSize, strokeSize, 0, 0, 2*Math.PI);
    context.fill();
}


function drawSmooth() {
    let strokeSize = document.querySelector('input[type=range').value;
    console.log('drawing');
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(currX, currY);
    context.strokeStyle = document.querySelector('input[type=color]').value;
    context.lineWidth = 2 * strokeSize;
    context.stroke();
    context.closePath();
}


canvas.addEventListener('mousedown', (e) => {
    pressed = true;
    lastX = currX;
    lastY = currY;
    currX = e.offsetX;
    currY = e.offsetY;
    console.log('mouse down');
    // let x = e.offsetX;
    // let y = e.offsetY;
    // draw(x, y);
});

canvas.addEventListener('mousemove', (e) => {
    if(!pressed) return;
    lastX = currX;
    lastY = currY;
    currX = e.offsetX;
    currY = e.offsetY;
    let distance = calculateDistance();
    let strokeSize = document.querySelector('input[type=range').value;
    if(distance < strokeSize) {
        draw(currX, currY);
    } else {
        draw(currX, currY);
        drawSmooth();
    }

    // let x = e.offsetX;
    // let y = e.offsetY;
    //draw(x, y);
});

canvas.addEventListener('mouseup', (e) => {
    pressed = false;
});