import { green, blue, red, grey, yellow, white, cyan, black, magenta } from 'chalk'

export const chalkGreen = (...str: any[]) => console.log(green(str[0]), str[1] ? str[1] : '')
export const chalkRed = (...str: any[]) => console.log(red(str[0]), str[1] ? str[1] : '')
export const chalkBlue = (...str: any[]) => console.log(blue(str[0]), str[1] ? str[1] : '')
export const chalkYellow = (...str: any[]) => console.log(yellow(str[0]), str[1] ? str[1] : '')
export const chalkGrey = (...str: any[]) => console.log(grey(str[0]), str[1] ? str[1] : '')
export const chalkWhite = (...str: any[]) => console.log(white(str[0]), str[1] ? str[1] : '')
export const chalkCyan = (...str: any[]) => console.log(cyan(str[0]), str[1] ? str[1] : '')
export const chalkBlack = (...str: any[]) => console.log(black(str[0]), str[1] ? str[1] : '')
export const chalkMagenta = (...str: any[]) => console.log(magenta(str[0]), str[1] ? str[1] : '')
