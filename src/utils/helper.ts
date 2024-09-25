export const tryCatch = <T>(
    callback: () => T | Promise<T>
): [Error | null, T | null] => {
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
