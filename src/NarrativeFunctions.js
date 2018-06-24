const askQuestion = (question) => {
    let output = document.getElementById('output')
    let q = document.createTextNode(question)
    output.appendChild(q)
}

const questionResponseHTML = async (type, options) => {
    if (type === 'freeText') {
        document.getElementById('input').innerHTML = `
        <input type="text" id="inputField">
        <button id="returnButton"> Return </button>
        `
        document.getElementById('returnButton').addEventListener('click', (e) => {
            let output = document.getElementById('output2')
            let a = document.createTextNode(document.getElementById('inputField').value)
            output.appendChild(a)
            global.response = document.getElementById('inputField').value
            global.levelStep ++
        })
    } else if (type === 'choice') {
        let choices = options.choices
        console.log(choices)
        let html = []
        choices.forEach(e => {
            html.push(
                `
                <div style="padding:5px; margin: 5px;">
                    <input type="radio" id="${e}" name="choice" value="${e}"/> ${e}
                </div>
                `
            )
        });
        document.getElementById('input').innerHTML = `<form> ` + html.join(' ') + `<div> <button type="submit">Submit</button></div></form>`
        let form = document.querySelector("form");
        form.addEventListener("submit", function (e) {
            let data = document.querySelector('input[name=choice]:checked').value;
            let output = document.getElementById('output2')
            let a = document.createTextNode(data)
            output.appendChild(a)
            global.response = data
            global.levelStep ++
            e.preventDefault();
        });
    }
}



export { questionResponseHTML, askQuestion }