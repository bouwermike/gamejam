
//Animation with a specific frame rate
const fpsTick = (fps, callback) => {

    const draw = () => {
        setTimeout(function () {
            requestAnimationFrame(draw);
            callback()
        }, 1000 / fps);
    }
    draw()
}

//Simple tweening to move elements from and to certain values. 
const simpleTween = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}


export { fpsTick, simpleTween } 