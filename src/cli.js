#!/usr/bin/env node
import fs from 'fs-extra'
import cac from 'cac'
import globby from 'globby'
import chalk from 'chalk'
import { parse } from '.'

const cli = cac()

cli.option('apiOnly', {
  desc: 'Only show APIs like Promise',
  type: 'boolean'
})

cli.command('*', 'Detect from input files', async (input, flags) => {
  if (input.length === 0) {
    return cli.showHelp()
  }
  const files = await globby(input.concat('!**/node_modules/**'))
  if (files.length === 0) {
    console.error('No input!')
    process.exit(1)
  }
  const fileStats = await Promise.all(
    files.map(file =>
      fs
        .readFile(file, 'utf8')
        .then(content => ({ stats: parse(content).stats.filter(stat => flags.apiOnly ? stat.type === 'API' : true), file }))
    )
  )
  for (const fileStat of fileStats) {
    if (fileStat.stats.length > 0) {
      process.exitCode = 1
    }

    for (const stat of fileStat.stats) {
      const fileLoc = `${fileStat.file}:${stat.loc.start.line}:${
        stat.loc.start.column
      }`
      if (stat.type === 'API') {
        console.log(
          chalk.yellow(stat.type),
          'You may need a polyfill for',
          chalk.green(stat.value),
          chalk.dim(fileLoc)
        )
      } else {
        console.log(chalk.cyan(stat.type), chalk.dim(fileLoc))
      }
    }
  }
})

cli.parse()
