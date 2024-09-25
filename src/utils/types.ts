import { BuiltInQuestion } from 'inquirer/dist/cjs/types/types'

export type Question = BuiltInQuestion & {
    name: string
}

export type ModifiedData = NodeJS.ArrayBufferView | string

export type DevDependency = {
    dev: string
    version: string
}

export type PackageJson = {
    name: string
    version: string
    description?: string
    main?: string
    types?: string
    scripts?: {
        [key: string]: string
    }
    repository?: {
        type: string
        url: string
    }
    keywords?: string[]
    author?:
        | string
        | {
              name: string
              email?: string
              url?: string
          }
    license?: string
    bugs?: {
        url: string
    }
    homepage?: string
    dependencies?: {
        [key: string]: string
    }
    devDependencies?: {
        [key: string]: string
    }
    peerDependencies?: {
        [key: string]: string
    }
    optionalDependencies?: {
        [key: string]: string
    }
    engines?: {
        node?: string
        npm?: string
    }
    private?: boolean
}
