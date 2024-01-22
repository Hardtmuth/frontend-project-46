#!/usr/bin/env node

import { Command } from 'commander';
// import { cwd } from 'node:process';
import parse from '../index.js';
import getFormat from '../src/getFormat.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    // console.log(cwd());
    // console.log(getFormat(filepath1), getFormat(filepath2));
    console.log([parse(filepath1, getFormat(filepath1)),
      parse(filepath2, getFormat(filepath2))]);
  });

program.parse();
