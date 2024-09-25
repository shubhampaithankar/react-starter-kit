import { readFileSync, writeFileSync } from 'fs'
import { DevDependency, ModifiedData, PackageJson } from './types'
import { chalkGreen, chalkRed } from '../Chalk'
import { CheerioAPI, load } from 'cheerio'

export const tryCatch = <T>(callback: () => T | Promise<T>): [Error | null, T | null] => {
    let resolvedValue: [Error | null, T | null] = [null, null]

    try {
        const result = callback()
        // If the callback returns a promise, await it and return the resolved value
        if (result instanceof Promise) {
            result
                .then((res) => {
                    resolvedValue = [null, res]
                })
                .catch((err) => {
                    throw err
                })
            return resolvedValue
        }

        return [null, result as T] // Synchronous case
    } catch (error: any) {
        return [error instanceof Error ? error : new Error(String(error)), null]
    }
}

export function editFile(filePath: string, callback: (data: string) => ModifiedData) {
    const [error, data] = tryCatch(() => {
        const data = readFileSync(filePath, 'utf-8')
        const modifiedData = callback(data)
        writeFileSync(filePath, modifiedData, 'utf-8')
    })

    if (error) chalkRed(`There was an error in ${arguments.callee.name}, ${error}`)
}

export function editHtmlFileDom(filePath: string, callback: (data: CheerioAPI) => unknown) {
    const [error, data] = tryCatch(() => {
        const data = readFileSync(filePath, 'utf8')
        const $ = load(data)
        callback($)

        const modifiedData = $.html()
        writeFileSync(filePath, modifiedData, 'utf8')
        return true
    })

    if (error) return chalkRed(`There was an error in ${arguments.callee.name}`, error)
    if (data) return chalkGreen(`${filePath} updated successfully`)
}

export function addPackage(dependency: string, version: string = 'latest', devDependencies: DevDependency[]) {
    const [error, data] = tryCatch(() => {
        editFile('package.json', (content) => {
            const packageJson: PackageJson = JSON.parse(content)

            // Ensure the dependency type exists
            if (!packageJson['dependencies']) packageJson['dependencies'] = {}
            if (!packageJson['devDependencies']) packageJson['devDependencies'] = {}

            // Add the dependency
            packageJson['dependencies'][dependency] = version

            // Add the dev dependencies
            devDependencies.forEach(({ dev, version }) => {
                packageJson['devDependencies']![dev] = version
            })

            return JSON.stringify(packageJson, null, 2)
        })
        return true
    })

    if (error) return chalkRed(`There was an error in ${arguments.callee.name}, ${error}`)
    if (data) return chalkGreen(`Dependency ${dependency}@${version} added to package.json successfully`)
}
