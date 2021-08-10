let pixelStack = [];
let pixelPosition;
let width = canvas.width;
let height = canvas.height;
let startR, startG, startB, startA;
let colorArray;
let checkLeft = false, checkRight = false;

function fillBucket(x, y, startColor, endColor) {

    startR = startColor[0];
    startG = startColor[1];
    startB = startColor[2];
    startA = 255;

    pixelStack = [{x, y}];
    colorArray = context.getImageData(0, 0 , width, height).data;

    while(pixelStack.length > 0) {
        let pixel = pixelStack.pop();
        let x = pixel.x;
        let y = pixel.y;

        pixelPosition = 4 * (y * width + x);
        while(y-- >= 0 && isSameColor(pixelPosition)) {
            pixelPosition -= width * 4;
        }

        y++;
        pixelPosition += width * 4;
        checkLeft = false;
        checkRight = false;

        while(y++ < height - 1 && isSameColor(pixelPosition)) {
            colorPixel(pixelPosition, endColor);
            if(x > 0) {
                if(isSameColor(pixelPosition - 4)) {
                    if(!checkLeft) {
                        pixelStack.push({ x : x - 1, y });
                        checkLeft = true;
                    } 
                } else if(checkLeft) {
                    checkLeft = false;
                }
            }

            if(x < width - 1) {
                if(isSameColor(pixelPosition + 4)) {
                    if(!checkRight) {
                        pixelStack.push({ x: x + 1, y });
                        checkRight = false;
                    } 
                } else if(checkRight) {
                    checkRight = false;
                }
            }
           
            pixelPosition += width * 4;
        }
    }
    context.putImageData(new ImageData(colorArray, width, height), 0, 0);
    socket.emit('fill', { x, y, startColor, endColor, roomId});
}


function isSameColor(pixelPosition) {
    let r = colorArray[pixelPosition];
    let g = colorArray[pixelPosition + 1];
    let b = colorArray[pixelPosition + 2];
    return (r == startR && g == startG && b == startB);
}

function colorPixel(pixelPosition, color) {
    colorArray[pixelPosition] = color[0];
    colorArray[pixelPosition + 1] = color[1];
    colorArray[pixelPosition + 2] = color[2];
    colorArray[pixelPosition + 3] = 255;
}

function fillCanvasBackground() {
    let imgData = context.getImageData(0, 0, width, height);
    for(let i = 0; i < imgData.data.length; i++) {
        imgData.data[i] = 255;
    }
    context.putImageData(imgData, 0, 0);
}