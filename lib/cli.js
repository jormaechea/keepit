#!/usr/bin/env node

'use strict';

const yargs = require('yargs');

// eslint-disable-next-line
yargs
	.commandDir('./commands')
	.demandCommand()
	.help()
	.argv;
