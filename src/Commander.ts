import { Command } from 'commander'
import { action } from './Actions'
import { chalkGreen } from './Chalk'

export default class Commader extends Command {
    constructor() {
        super()
    }

    async init() {
        super
            .version('0.0.1')
            .description(
                'CLI to automate react project development with support for additional dependacies'
            )
            .action(async () => {
                const answers = await action()
                const { appName, language } = answers
                chalkGreen(`Creating app ${appName} with ${language}`)
            })
    }
}
