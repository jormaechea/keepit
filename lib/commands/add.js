'use strict';

const { Keepit } = require('..');
const Printer = require('../printer');

module.exports.command = 'add [name] [description]';

module.exports.describe = 'Save a new package';

module.exports.builder = yargs => {

	return yargs
		.positional('name', {
			description: 'The package name or URL',
			type: 'string'
		})
		.positional('description', {
			description: 'A description for the package. If it\'s not provided, it will be fetched from NPM registry',
			type: 'string'
		})
		.demandOption(['name'])
		.help();
};

module.exports.handler = async argv => {

	const {
		name,
		description
	} = argv;

	const keepit = new Keepit();

	await keepit.addPackage(name, description);

	Printer.print(`Package ${name} added to your list!`);
};
