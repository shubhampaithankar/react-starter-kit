import inquirer from 'inquirer'
import { appName, language } from './prompts'

export const action = async () => await inquirer.prompt([appName, language])
