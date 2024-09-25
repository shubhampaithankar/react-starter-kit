import { BuiltInQuestion } from 'inquirer/dist/cjs/types/types'

const appName: BuiltInQuestion = {
    type: 'input',
    message: 'Enter your app name:',
    default: 'my-app',
}

export default appName
