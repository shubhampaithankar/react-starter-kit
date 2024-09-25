import degit from 'degit'
import { editHtmlFileDom, tryCatch, editFile, editReactFiles, deleteFile } from '../utils/helper'
import { chalkGreen, chalkRed } from '../Chalk'
import { PackageJson } from '../utils/types'

export default async function createViteTemplate(appName: string, language: string) {
    const [error, done] = tryCatch(async () => {
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
        editHtmlFileDom('index.html', ($) => {
            $('title').text(appName)
        })

        // edit package.json to set the app name and description
        editFile('package.json', (content) => {
            const packageJson: PackageJson = JSON.parse(content)
            // check for white spaces and replace them with -
            const name = appName.replace(/\s/g, '-')
            packageJson.name = name
            return JSON.stringify(packageJson, null, 2)
        })

        // clear readme.md and add my custom readme
        editFile('README.md', () => '')

        /* Make changes in src directory */
        process.chdir('src')

        // edit App.jsx to set the app name and extension
        editReactFiles(`App.${jsxExtension}`, app(appName))

        // delete App.css
        deleteFile('App.css')

        // clear index.css
        editFile('index.css', () => '')

        /* once done making changes in src directory go back*/
        process.chdir('..')

        return true
    })

    if (error) return chalkRed(`There was an error in ${arguments.callee.name}`, error)
}

// my readme.md in markdown language
const readMe = () => ``

const app = (appName: string) => `export default function createViteTemplate() {
  return (
    <h1>
      ${appName}
    </h1>
  )
}`
