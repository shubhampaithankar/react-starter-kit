import degit from 'degit'
import { editHtmlFileDom, tryCatch, editFile } from '../utils/helper'
import { chalkGreen, chalkRed } from '../Chalk'

export default async function createViteTemplate(appName: string, language: string) {
    const [error, data] = tryCatch(async () => {
        const ts = language === 'TypeScript'
        const viteTemplate = ts ? 'template-react-ts' : 'template-react'

        const repo = degit(`vitejs/vite/packages/create-vite/${viteTemplate}`, {
            force: true,
        })
        await repo.clone(appName)
        process.chdir(appName)

        // edit title in index.html to set it to the app name
        editHtmlFileDom('index.html', ($) => {
            $('title').text(appName)
        })

        // todo: edit package.json to set the app name and description

        // clear readme.md and add my custom readme
        editFile('README.md', () => readMe())
        chalkGreen(`README.md updated successfully`)

        const extension = ts ? 'ts' : 'js'
        const jsxExtension = `${extension}x`

        return true
    })

    if (error) return chalkRed(`There was an error in ${arguments.callee.name}, ${error}`)
}

// my readme.md in markdown language
const readMe = () => ``
