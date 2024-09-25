import inquirer from 'inquirer'
import { appName, language, cssFramework } from './prompts'

export const action = async () => await inquirer.prompt([appName, language, cssFramework])
