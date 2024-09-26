import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs'
import { CheerioAPI, load } from 'cheerio'

import { ModifiedData, PackageJson } from './types'
import { chalkGreen, chalkRed } from '../Chalk'
import { execSync } from 'child_process'

export const tryCatch = async <T>(callback: () => T | Promise<T>): Promise<[Error | null, T | null]> => {
    let resolvedValue: [Error | null, T | null] = [null, null]

    try {
        const result = await callback()
        return [null, result as T]
    } catch (error: any) {
        return [error instanceof Error ? error : new Error(String(error)), null]
    }
}

export async function editFile(filePath: string, callback: (data: string) => ModifiedData | Promise<ModifiedData>) {
    const [error, done] = await tryCatch(async () => {
        const data = readFileSync(filePath, 'utf-8')
        const modifiedData = await callback(data)
        writeFileSync(filePath, modifiedData, 'utf-8')
        return true
    })

    if (error) return chalkRed(`There was an error in editFile`, error)
    return chalkGreen(`${filePath} edited successfully`)
}

// delete file if it exists
export async function deleteFile(filePath: string) {
    const [error, done] = await tryCatch(() => {
        if (!existsSync(filePath.toLowerCase())) throw new Error('File does not exist')
        else unlinkSync(filePath)
    })

    if (error) return chalkRed(`There was an error in deleteFile`, error)
    return chalkGreen(`${filePath} deleted successfully`)
}

// edit html dom
export async function editHtmlFileDom(filePath: string, callback: (data: CheerioAPI) => unknown) {
    const [error, done] = await tryCatch(() => {
        const data = readFileSync(filePath, 'utf8')
        const $ = load(data)
        callback($)

        const modifiedData = $.html()
        writeFileSync(filePath, modifiedData, 'utf8')
        return true
    })

    if (error) return chalkRed(`There was an error in editHtmlFileDom`, error)
    return chalkGreen(`${filePath} edited successfully`)
}

// todo: add react serializer
// todo: use react serializer to edit react files
export async function editReactFiles(filePath: string, content: string) {
    const [error, done] = await tryCatch(() => {
        // if file doesnt exist create one
        if (!existsSync(filePath.toLowerCase())) writeFileSync(filePath, '')
        editFile(filePath, () => content)
    })

    if (error) return chalkRed(`There was an error in editReactFiles`, error)
}

// add package to package.json
export async function addPackage(dependency: string, devDependencies?: string[]) {
    const [error, done] = await tryCatch(async () => {
        editFile('package.json', async (content) => {
            const packageJson: PackageJson = JSON.parse(content)

            // Ensure the dependency type exists
            if (!packageJson['dependencies']) packageJson['dependencies'] = {}
            if (!packageJson['devDependencies']) packageJson['devDependencies'] = {}

            const version = await getPackageInfo(dependency)
            if (typeof version !== 'string') throw new Error(`${dependency} is not a valid dependency`)

            // Add the dependency
            packageJson['dependencies'][dependency] = version

            // // Add the dev dependencies
            devDependencies?.forEach((dev) => {
                const v = getPackageInfo(dev)
                if (typeof v !== 'string') throw new Error(`${dev} is not a valid dev dependency`)
                packageJson['devDependencies']![dev] = v
            })

            return JSON.stringify(packageJson, null, 2)
        })
        return true
    })

    if (error) return chalkRed(`There was an error in addPackage`, error)
    return chalkGreen(`Dependency ${dependency} added to package.json successfully`)
}

// get dep and its version
export async function getPackageInfo(dependency: string) {
    const [error, done] = await tryCatch(() => {
        // get package and its latest version
        const data = execSync(`npm view ${dependency} version`).toString().trim()
        return data
    })

    if (error) return error
    return done
}
