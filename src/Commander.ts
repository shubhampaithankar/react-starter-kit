import { Command } from 'commander'
import { action } from './Actions'
import { chalkGreen, chalkRed } from './Chalk'
import { createViteTemplate } from './actions/'
import { tryCatch } from './utils/helper'

export default class Commader extends Command {
    appName: string = ''
    constructor() {
        super()
        this.appName = 'my-app'
    }

    async init() {
        const [error] = tryCatch(() => {
            super
                .version('0.0.1')
                .description('CLI to automate react project development with support for additional dependacies')
                .action(async () => {
                    const answers = await action()
                    const { appName, language } = answers

                    // Create vite template
                    chalkGreen(`Creating app ${appName} with ${language}`)
                    createViteTemplate(appName, language)

                    this.appName = appName
                })
        })
        if (error) return chalkRed('There was an error in Commander.init()')
    }
}
