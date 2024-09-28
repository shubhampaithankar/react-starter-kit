import { chalkRed } from '../utils/chalk'
import { execCommand, tryCatch } from '../utils/helper'

// export default class createNextTemplate {
//     constructor() {}
//     async run(appName: string, language: string, tw: boolean) {
//         const [error] = await tryCatch(async () => {
//             const ts = language === 'TypeScript'
//             const nextTemplate = ts ? (tw ? 'app-tw/ts' : 'app/js') : tw ? 'app-tw/js' : 'app/js'

//             const repo = degit(`vercel/next.js/tree/canary/packages/create-next-app/templates/${nextTemplate}`)
//             await repo.clone(appName)

//             process.chdir(appName)

//             const extension = ts ? 'ts' : 'js'
//             const jsxExtension = `${extension}x`
//         })
//         if (error) return chalkRed('There was an error in CreateViteTemplate.run()', error)
//     }
// }

export default async function createNextTemplate(appName: string, language: string, tw: boolean) {
    const [error] = await tryCatch(async () => {
        const ts = language === 'TypeScript'
        const eslint = false
        const execString = `npx create-next-app@latest ${appName} --no-install --src-dir --app --no-turbo --no-import-alias ${eslint ? '--eslint' : '--no-eslint'} ${tw ? '--tailwind' : '--no-tailwind'} ${ts ? '--typescript' : '--javascript'}`

        await execCommand(execString)

        process.chdir(appName)

        const extension = ts ? 'ts' : 'js'
        const jsxExtension = `${extension}x`
    })
    if (error) return chalkRed('There was an error in CreateViteTemplate.run()', error)
}
