import { Command } from 'commander'
import Actions, { action } from './Actions'
import { chalkBlue, chalkRed } from './utils/chalk'
import { createViteTemplate, installBootstrap, installTailwind } from './actions/'
import { tryCatch } from './utils/helper'
import { Prompt } from './Loader'

export default class Commader extends Command {
    constructor() {
        super()
    }

    async init() {
        const [error, done] = await tryCatch(() => {
            super
                .version('0.0.1')
                .description('CLI to automate react project development with support for additional dependacies')
                .action(async () => {
                    const answers = await action()
                    const { appName, language, cssFramework } = answers

                    // Create vite template
                    chalkBlue(`Pulling vite app with name ${appName} in ${language}`)
                    await createViteTemplate(appName, language)

                    if (cssFramework !== 'None') {
                        switch (cssFramework) {
                            case 'Tailwind':
                                await installTailwind(appName, language)
                                break

                            case 'Bootstrap':
                                await installBootstrap(appName)
                                break
                            default:
                                break
                        }
                    }
                })
            return true
        })
        if (error) return chalkRed('There was an error in Commander.init()', error)
        // if (done) return chalkGreen(`cd ${this.appName} && npm install`)
    }
}
