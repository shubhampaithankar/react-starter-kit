import { Question } from '../utils/types'

const tanStack: Question = {
    type: 'checkbox',
    name: 'externalHooks',
    message: 'Would you like to include the following TanStack libraries?',
    choices: ['TanStack Query'],
    default: [],
}

export default tanStack
