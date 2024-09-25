import { BuiltInQuestion } from 'inquirer/dist/cjs/types/types'

export type Question = BuiltInQuestion & {
    name: string
}

export type ModifiedData = NodeJS.ArrayBufferView | string

export type DevDependency = {
    dev: string
    version: string
}
