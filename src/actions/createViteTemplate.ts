import degit from 'degit'
import { editHtmlFileDom, tryCatch, editFile, editReactFiles, deleteFile } from '../utils/helper'
import { chalkGreen, chalkRed } from '../Chalk'
import { PackageJson } from '../utils/types'

export default async function createViteTemplate(appName: string, language: string) {
    const [error, done] = await tryCatch(async () => {
        const ts = language === 'TypeScript'
        const viteTemplate = ts ? 'template-react-ts' : 'template-react'

        const repo = degit(`vitejs/vite/packages/create-vite/${viteTemplate}`, {
            force: true,
        })
        await repo.clone(appName)
        process.chdir(appName)

        const extension = ts ? 'ts' : 'js'
        const jsxExtension = `${extension}x`

        // edit title in index.html to set it to the app name
        await editHtmlFileDom('index.html', ($) => {
            $('title').text(appName)
        })

        // edit package.json to set the app name and description
        await editFile('package.json', (content) => {
            const packageJson: PackageJson = JSON.parse(content)
            // check for white spaces and replace them with -
            const name = appName.replace(/\s/g, '-')
            packageJson.name = name
            return JSON.stringify(packageJson, null, 2)
        })

        // clear readme.md and add my custom readme
        await editFile('README.md', () => '')

        /* Make changes in src directory */
        // edit App.jsx to set the app name and extension
        await editReactFiles(`src/App.${jsxExtension}`, app(appName))

        // delete App.css
        await deleteFile('src/App.css')

        // delete assets/react.svg
        await deleteFile('src/assets/react.svg')

        // clear index.css
        await editFile('src/index.css', () => '')

        return true
    })

    if (error) return chalkRed(`There was an error in createViteTemplate`, error)
    return new Promise((resolve, reject) => resolve(chalkGreen(`Vite React created successfully`)))
}

// my readme.md in markdown language
const readMe = ``

const app = (appName: string) => `export default function createViteTemplate() {
  return (
    <h1>
      ${appName}
    </h1>
  )
}`
