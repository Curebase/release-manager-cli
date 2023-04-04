#!/usr/bin/env node
import commands from './commands';
import { Command } from 'commander';

const program = new Command();

commands.forEach(({ COMMAND_NAME, DESCRIPTION, action }) => {
  program.command(COMMAND_NAME).description(DESCRIPTION).action(action);
});


program.parse(process.argv);

