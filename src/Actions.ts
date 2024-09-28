import inquirer from 'inquirer'
import Commader from './Commander'
import { appName, language, cssFramework, ssr } from './prompts'
import { tryCatch } from './utils/helper'

export const action = async () => await inquirer.prompt([ssr, appName, language, cssFramework])
