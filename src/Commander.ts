import { Command } from 'commander'
import { action } from './Actions'
import { chalkBlue, chalkGreen, chalkRed } from './Chalk'
import { createViteTemplate } from './actions/'
import { tryCatch } from './utils/helper'

export default class Commader extends Command {
    appName: string = ''
    constructor() {
        super()
        this.appName = 'my-app'
    }

    async init() {
        const [error, done] = tryCatch(() => {
            super
                .version('0.0.1')
                .description('CLI to automate react project development with support for additional dependacies')
                .action(async () => {
                    const answers = await action()
                    const { appName, language } = answers

                    // Create vite template
                    chalkBlue(`Pulling vite app with name ${appName} in ${language}`)
                    createViteTemplate(appName, language)

                    this.appName = appName
                })
            return true
        })
        if (error) return chalkRed('There was an error in Commander.init()')
        if (done) return chalkGreen(`cd ${this.appName} && npm install`)
    }
}
