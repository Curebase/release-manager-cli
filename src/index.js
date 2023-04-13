#!/usr/bin/env node
import commands from './commands';
import { Command } from 'commander';

const program = new Command();

for (const command of commands) {
  const { COMMAND_NAME, DESCRIPTION, OPTIONS, action } = command;

  program
    .command(COMMAND_NAME)
    .description(DESCRIPTION)
    .option(OPTIONS[0].name, OPTIONS[0].description)
    .action(action);
}

program.parse(process.argv);
