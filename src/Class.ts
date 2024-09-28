import Commader from './Commander'
import { chalkRed } from './utils/chalk'
import { tryCatch } from './utils/helper'

export class Prompt {
    commander: Commader
    name: string
    emitter: Commader
    constructor(client: Commader, name: string, config: any = {}) {
        this.commander = client
        this.name = name
        this.emitter = this.commander
    }
    async run(...args: any[]) {
        const [error, _] = await tryCatch(() => {
            throw new Error(`The run method has not been implemented in ${this.name}`)
        })
        if (error) return chalkRed('There was an error in Prompt.run()', error)
    }
}
