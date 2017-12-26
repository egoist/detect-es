#!/usr/bin/env node
import cac from 'cac'
import main from '.'

const cli = cac()

cli.command('*', 'Detect from input files', input => {
  return main(input)
})

cli.parse()
