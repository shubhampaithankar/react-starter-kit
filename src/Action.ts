import inquirer from 'inquirer'
import Commader from './Commander'
import { appName, language, cssFramework, ssr } from './prompts'
import { tryCatch } from './utils/helper'

export const action = async () => await inquirer.prompt([ssr, appName, language, cssFramework])

export default class Action {
    commander: Commader
    answers: { [x: string]: string | boolean } | undefined

    constructor(commander: Commader) {
        this.commander = commander
    }

    async run() {
        const [error] = await tryCatch(async () => {
            const answers = await inquirer.prompt([ssr, appName, language, cssFramework])
            this.answers = answers
        })
    }
}
