import * as chalk from 'chalk'

export const log = (msg: string, ...args: any[]) => {
  // tslint:disable-next-line no-console
  console.log(msg, ...args)
}

export const success = (msg: string, ...args: any[]) => {
  log(chalk.bgGreen('Success'), chalk.green(msg), ...args)
}

export const info = (msg: string, ...args: any[]) => {
  log(chalk.bgBlue('Info : '), chalk.blue(msg), ...args)
}

export const warn = (msg: string, ...args: any[]) => {
  log(chalk.bgYellow('Warning : '), chalk.yellow(msg), ...args)
}

export const error = (msg: string, ...args: any[]) => {
  log(chalk.bgRed('Error : '), chalk.red(msg), ...args)
}
