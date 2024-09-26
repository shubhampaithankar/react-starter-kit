import { Question } from '../utils/types'

const cssFramework: Question = {
    name: 'cssFramework',
    type: 'list',
    message: 'Select a CSS framework:',
    choices: ['Tailwind', 'Bootstrap', 'None'],
    default: 'None',
}

export default cssFramework
