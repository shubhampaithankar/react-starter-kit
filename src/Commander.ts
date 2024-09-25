import { Command } from 'commander'

export default class Commader extends Command {
    constructor() {
        super()
    }

    async init() {
        super.version('0.0.1')
        super.description(
            'CLI to automate react project development with support for additional dependacies'
        )
    }
}
