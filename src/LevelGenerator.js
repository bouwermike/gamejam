import _ from 'lodash'

const randomCoords = (minrange, maxrange) => {
    return {
        x: _.random(minrange, maxrange),
        y: _.random(minrange, maxrange)
    }
}

let environmentGenerator = (elements, width, height) => {
    let envList = []
    for (let i = 0; i < elements; i++) {
        let dimensions = {
            x: randomCoords(100,800).x,
            y: randomCoords(100,800).y,
            w: width,
            h: height
        }
        envList.push(dimensions)
    }
    return envList
}
export { environmentGenerator }