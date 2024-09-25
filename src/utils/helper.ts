import { readFileSync, writeFileSync } from 'fs'
import { ModifiedData } from './types'

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
    const [error] = tryCatch(() => {
        const data = readFileSync(filePath, 'utf-8')
        const modifiedData = callback(data)
        writeFileSync(filePath, modifiedData, 'utf-8')
    })

    if (error) {
        console.log(`There was an error in ${arguments.callee.name}`, error)
        return
    }
}
