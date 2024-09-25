import { Question } from '../utils/types'

const cssFramework: Question = {
    name: 'cssFramework',
    type: 'list',
    message: 'Select a CSS framework:',
    choices: ['Tailwind', 'Bootstrap', 'Vanilla'],
    default: 'Vanilla',
}

export default cssFramework
