
const getCursorPosition = (canvas, event) => {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {
        cursor: {
            x: x,
            y: y
        }
    }
}

const checkCollision = (circle, rect) => {
    let distX = Math.abs(circle.x - rect.x - rect.w / 2);
    let distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) { return false; }
    if (distY > (rect.h / 2 + circle.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; }
    if (distY <= (rect.h / 2)) { return true; }

    let dx = distX - rect.w / 2;
    let dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}



export { getCursorPosition, checkCollision }