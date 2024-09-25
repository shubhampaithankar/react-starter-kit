import { green, blue, red, grey, yellow, white, cyan, black, magenta } from 'chalk'

export const chalkGreen = (...args: any[]) => console.log(green(args[0]), nextLineError(args[1]))
export const chalkRed = (...args: any[]) => console.log(red(args[0]), nextLineError(args[1]))
export const chalkBlue = (...args: any[]) => console.log(blue(args[0]), nextLineError(args[1]))
export const chalkYellow = (...args: any[]) => console.log(yellow(args[0]), nextLineError(args[1]))
export const chalkGrey = (...args: any[]) => console.log(grey(args[0]), nextLineError(args[1]))
export const chalkWhite = (...args: any[]) => console.log(white(args[0]), nextLineError(args[1]))
export const chalkCyan = (...args: any[]) => console.log(cyan(args[0]), nextLineError(args[1]))
export const chalkBlack = (...args: any[]) => console.log(black(args[0]), nextLineError(args[1]))
export const chalkMagenta = (...args: any[]) => console.log(magenta(args[0]), nextLineError(args[1]))

const nextLineError = (err: unknown) => (err ? '\n' + err : '')
