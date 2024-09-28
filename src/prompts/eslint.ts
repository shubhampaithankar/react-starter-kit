import { Question } from '../utils/types'

const eslint: Question = {
    name: 'eslint',
    type: 'confirm',
    message: 'Would you like to include ESLint?',
    default: true,
}

export default eslint
