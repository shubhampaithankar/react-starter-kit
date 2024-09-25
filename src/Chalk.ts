import {
    green,
    blue,
    red,
    grey,
    yellow,
    white,
    cyan,
    black,
    magenta,
} from 'chalk'

export const chalkGreen = (str: string) => console.log(green(str))
export const chalkRed = (str: string) => console.log(red(str))
export const chalkBlue = (str: string) => console.log(blue(str))
export const chalkYellow = (str: string) => console.log(yellow(str))
export const chalkGrey = (str: string) => console.log(grey(str))
export const chalkWhite = (str: string) => console.log(white(str))
export const chalkCyan = (str: string) => console.log(cyan(str))
export const chalkBlack = (str: string) => console.log(black(str))
export const chalkMagenta = (str: string) => console.log(magenta(str))
