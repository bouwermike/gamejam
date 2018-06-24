import { questionResponseHTML, askQuestion } from './NarrativeFunctions'

const levelOne = {
    init: () => {
        askQuestion("Hello, what is your name?")
        questionResponseHTML('freeText')
    }
}

export { levelOne }