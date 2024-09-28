import { chalkRed } from '../../utils/chalk'
import { addPackage, editFile, tryCatch } from '../../utils/helper'

export default async function installBootstrap(appName: string) {
    const [error, done] = await tryCatch(async () => {
        await addPackage('bootstrap', [])

        // process.chdir('src')

        await editFile('src/index.css', () => `@import "bootstrap/dist/css/bootstrap.min.css";`)

        // process.chdir('..')
    })

    if (error) return chalkRed(`There was an error in installBootstrap`, error)
}
