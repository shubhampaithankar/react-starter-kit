import degit from 'degit'

export default async function createViteTemplate(
    appName: string,
    language: string
) {
    const viteTemplate =
        language === 'TypeScript' ? 'template-react-ts' : 'template-react'
    const repo = degit(`vitejs/vite/packages/create-vite/${viteTemplate}`, {
        force: true,
    })
    await repo.clone(appName)
    process.chdir(appName)
}
