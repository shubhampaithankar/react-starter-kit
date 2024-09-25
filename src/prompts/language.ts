import { Question } from '../utils/types'

const language: Question = {
    name: 'language',
    type: 'list',
    message: 'Choose language:',
    choices: ['JavaScript', 'TypeScript'],
    default: 'JavaScript',
}

export default language
