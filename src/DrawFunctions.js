const clearCanvas = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const drawCircle = (ctx, x, y, r, start, end, fill, style) => {
    ctx.beginPath();
    ctx.arc(x, y, r, start, end * Math.PI);
    if (fill) {
        ctx.fillStyle = style
        ctx.fill()
        ctx.closePath()
    } else {
        ctx.stroke()
        ctx.closePath()
    }
}

const drawLine = (ctx, startx, starty, endx, endy) => {
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    ctx.stroke();
}

const drawRect = (ctx, x, y, width, height, style) => {
    ctx.beginPath()
    ctx.fillStyle = style
    ctx.fillRect(x, y, width, height);
    //ctx.closePath()
}


export { clearCanvas, drawCircle, drawLine, drawRect }