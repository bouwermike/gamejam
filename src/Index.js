import './css/styles.css'
import { fpsTick } from './AnimateFunctions'
// import { environmentGenerator } from './LevelGenerator'
import { getCursorPosition, checkCollision } from './ControlFunctions'
import { clearCanvas, drawCircle, drawLine, drawRect } from './DrawFunctions'
import { levelOne } from './Levels'
import { Tweenable } from 'shifty';
import _ from 'lodash';

// //get the canvas element
const canvas = document.getElementById('gameCanvas')
const canvas1 = document.getElementById('gameCanvas1')

//establish 2d context
const ctx = canvas.getContext('2d')
const ctx1 = canvas1.getContext('2d')

canvas.height = 800
canvas.width = 1000
canvas1.height = 800
canvas1.width = 1000

//circle sprite
let x = 500;
let y = 400;
let r = 25
let rad = 0

//level environment elements


// //movement attributes
let targetX = null;
let targetY = null;

let speed = 0.1

// //initialize stage
const level = {
    x: 500,
    y: 500,
    w: 100,
    h: 400
}

//Animations
const breatheAnimation = () => {
    const breathe = new Tweenable()
    const start = { x: 25 }
    const step = state => r = state.x
    const duration = 500
    const easing = 'linear'
    breathe.tween({
        from: start,
        to: { x: 30 },
        step,
        duration,
        easing
    }).then(from => breathe.tween({
        from,
        to: start,
        step,
        duration,
        easing
    })).then(breatheAnimation);
}

breatheAnimation();

const pulseAnimation = () => {
    const pulse = new Tweenable()
    const start = { x: 0 }
    //let rad = 0
    const step = (state) => {
        rad = state.x
    }
    const duration = 500
    const easing = 'linear'
    pulse.tween({
        from: start,
        to: { x: 15 },
        step,
        duration,
        easing
    }).then(from => pulse.tween({
        from,
        to: start,
        step,
        duration,
        easing
    })).then(pulseAnimation);
}

pulseAnimation();

let wx = x
let wy = y
const warpAnimation = () => {
    const rifts = new Tweenable()
    const start = { x: wx, y: wy }

    const step = (state) => {
        wx = state.x
        wy = state.y
        drawRect(ctx, wx, wy, 5, 5, 'magenta')
    }
    const duration = 950
    const easing = 'linear'
    rifts.tween({
        from: start,
        to: { x: x + (25 * _.random(-1, 1)), y: y + (25 * _.random(-1, 1)) },
        step,
        duration,
        easing
    }).then(() => {
        wx = x
        wy = y
    })
}

const backgroundStars = () => {
    let sx = _.random(0, 1000)
    let sy = _.random(0, 800)
    let sr = _.random(3, 6)
    const stars = new Tweenable()
    const start = { x: sx, y: sy }

    const step = (state) => {
        sx = state.x
        sy = state.y
        drawCircle(ctx1, sx, sy, sr, 0, 2, true, 'yellow')
    }
    const duration = _.random(30000, 100000)
    const easing = 'linear'
    stars.tween({
        from: start,
        to: { x: _.random(-1000, 1000), y: _.random(-1000, 1000) },
        step,
        duration,
        easing
    })
        .then(backgroundStars);
}

let numStars = 40
for (let i = 0; i < numStars; i++) {
    backgroundStars();
}



const movement = new Tweenable()
const move = () => {

    let deltaX = targetX - x
    let deltaY = targetY - y
    let distance = Math.hypot(deltaX, deltaY)
    let duration = distance / speed

    movement.setConfig({
        from: { x: x, y: y },
        to: { x: targetX, y: targetY },
        duration: duration,
        easing: 'linear',
        step: (state) => {
            x = state.x
            y = state.y
        }
    })

    movement.tween()
}

let scrollRight = false
let scrollLeft = false
let scrollUp = false
let scrollDown = false
let camera = {
    x: 0,
    y: 0
}
fpsTick(60, () => {
    let circle = {
        x: x,
        y: y,
        r: r
    }

    clearCanvas(ctx, canvas)
    clearCanvas(ctx1, canvas1)
    if (checkCollision(circle, level)) {
        console.log(true)
    }
    if (scrollRight) {
        camera.x -= 5
    } else if (scrollLeft) {
        camera.x += 5
    } else if (scrollUp) {
        camera.y += 5
    } else if (scrollDown) {
        camera.y -= 5
    }
    ctx.save()
    ctx.translate(camera.x, camera.y);
    drawRect(ctx1, 0, 0, 1000, 800, 'black')
    drawRect(ctx, 500, 500, 100, 400, 'blue')
    drawCircle(ctx, x, y, r, 0, 2, true, 'blue')
    drawCircle(ctx, x, y, rad, 0, 2, true, 'white')
    ctx.restore()
})

//user input
window.oncontextmenu = (e) => {
    let pos = getCursorPosition(canvas, e)
    targetX = pos.cursor.x - camera.x
    targetY = pos.cursor.y - camera.y
    if (movement.isPlaying()) {
        movement.stop()
        move()
    } else {
        move()
    }
    //return false;     // cancel default menu
}

canvas.addEventListener('mousemove', (e) => {
    let pos = getCursorPosition(canvas, e)
    scrollRight = false
    scrollLeft = false
    scrollDown = false
    scrollUp = false
    if (pos.cursor.x > 900) {
        scrollRight = true
    } else if (pos.cursor.x < 100) {
        scrollLeft = true
    } else if (pos.cursor.y < 50) {
        scrollUp = true
    } else if (pos.cursor.y > 700) {
        scrollDown = true
    }
})

canvas.addEventListener('mouseout', (e) => {
    scrollRight = false
    scrollLeft = false
    scrollDown = false
    scrollUp = false
})


let button = document.getElementById('returnButton')
button.addEventListener('click', (e) => {
    e.preventDefault();
    let warpCoords = {
        x: parseInt(document.getElementById('warpX').value),
        y: parseInt(document.getElementById('warpY').value)
    }
    console.log("warping")
    for (let i = 0; i < 10; i++) {
        warpAnimation()   
    }
    
    setTimeout(() => {
        x = warpCoords.x
        y = warpCoords.y
        wx = x
        wy = y
    }, 1000)
})


