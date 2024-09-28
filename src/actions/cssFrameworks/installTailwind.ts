import { execSync } from 'child_process'
import { chalkRed } from '../../utils/chalk'
import { addPackage, createFile, editFile, execCommand, renameFile, tryCatch } from '../../utils/helper'

export default async function installTailwind(appName: string, language: string) {
    const [error, done] = await tryCatch(async () => {
        const isTypeScript = language === 'TypeScript'

        await addPackage('tailwindcss', [])

        await createFile(
            `tailwind.config.${isTypeScript ? 'ts' : 'js'}`,
            () => `
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx${isTypeScript ? ',ts,tsx' : ''}}"],
    theme: {
        extend: {},
    },
    plugins: [],
}`
        )

        await editFile(
            'src/index.css',
            () => `
@tailwind base;
@tailwind components;
@tailwind utilities;
`
        )
    })

    if (error) return chalkRed(`There was an error in installBootstrap`, error)
}
