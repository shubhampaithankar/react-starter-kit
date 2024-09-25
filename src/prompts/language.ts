import { BuiltInQuestion } from 'inquirer/dist/cjs/types/types'

const language: BuiltInQuestion = {
    type: 'list',
    message: 'Choose language:',
    choices: ['JavaScript', 'TypeScript'],
}

export default language
