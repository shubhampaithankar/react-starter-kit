import degit from 'degit'
import { tryCatch } from '../utils/helper'
import { chalkRed } from '../Chalk'

export default async function createViteTemplate(appName: string, language: string) {
    const [error, data] = tryCatch(async () => {
        const viteTemplate = language === 'TypeScript' ? 'template-react-ts' : 'template-react'

        const repo = degit(`vitejs/vite/packages/create-vite/${viteTemplate}`, {
            force: true,
        })
        await repo.clone(appName)
        process.chdir(appName)

        const extension = language === 'TypeScript' ? 'ts' : 'js'
        const jsxExtension = `${extension}x`

        return true
    })

    if (error) return chalkRed(`There was an error in ${arguments.callee.name}, ${error}`)
}
