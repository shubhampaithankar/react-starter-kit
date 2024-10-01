import { Command } from 'commander'
import { action } from './Action'
import { chalkBlue, chalkRed } from './utils/chalk'
import { createNextTemplate, createViteTemplate, installBootstrap, installTailwind } from './actions/'
import { tryCatch } from './utils/helper'

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
                    const { appName, language, cssFramework, ssr } = answers

                    // Create vite template
                    if (!ssr) {
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

                        return
                    }

                    // Create next templte
                    chalkBlue(`Pulling next app with name ${appName} in ${language}`)
                    await createNextTemplate(appName, language, cssFramework === 'Tailwind')
                })
            return true
        })
        if (error) return chalkRed('There was an error in Commander.init()', error)
        // if (done) return chalkGreen(`cd ${this.appName} && npm install`)
    }
}
