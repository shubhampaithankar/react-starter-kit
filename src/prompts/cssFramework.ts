import { Question } from '../utils/types'

const cssFrameWork: Question = {
    name: 'cssFramework',
    type: 'list',
    message: 'Select a CSS framework:',
    choices: [
        'Tailwind CSS',
        'Bootstrap',
        // 'Material UI',
        // 'Ant Design',
        // 'Chakra UI',
        // 'Styled Components',
        'Vanilla CSS',
    ],
    default: 'Vanilla CSS',
}

export default cssFrameWork
