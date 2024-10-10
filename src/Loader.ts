import { readdirSync, lstatSync } from 'fs'
import path from 'path'

import Commader from './Commander'
import { Prompt } from './Class'
import { tryCatch } from './utils/helper'
import { chalkRed } from './utils/chalk'

export default class Loader {
    commander: Commader | any

    constructor(commander: Commader) {
        this.commander = commander
    }

    async loadPrompts(dir: string) {
        const [error] = await tryCatch(async () => {
            const filePath = path.join(__dirname, dir)
            const files = await readdirSync(filePath)
            for (const intFile of files) {
                const stat = await lstatSync(path.join(filePath, intFile))
                if (stat.isDirectory()) await this.loadPrompts(path.join(dir, intFile)) // Await recursive call
                if (intFile.endsWith('.ts')) {
                    const name = path.parse(intFile).name.toLowerCase()
                    const Interaction = await import(path.join(filePath, intFile))
                    if (Interaction.default?.prototype instanceof Prompt) {
                        const prompt = new Interaction.default(this.commander, name) as Prompt
                        this.commander.prompts.set(name, prompt)
                    }
                }
            }
        })
        if (error) return chalkRed('There was an error in loadPrompts', error)
    }
}
