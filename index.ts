import Commander from './src/Commander'

const commander = new Commander()

commander.init()
commander.parse(process.argv)

console.log(`Hello world`)
