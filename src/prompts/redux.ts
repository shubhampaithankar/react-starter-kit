import { Question } from '../utils/types'

const redux: Question = {
    type: 'confirm',
    name: 'redux',
    message: 'Would you like to include Redux?',
    default: false,
}

export default redux
