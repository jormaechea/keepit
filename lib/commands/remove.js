'use strict';

const { Keepit } = require('..');
const Printer = require('../printer');

module.exports.command = [
	'remove [name]',
	'rm [name]',
	'r [name]'
];

module.exports.describe = 'Remove a package from your list';

module.exports.builder = yargs => {

	return yargs
		.positional('name', {
			description: 'The package name',
			type: 'string'
		})
		.demandOption(['name'])
		.help();
};

module.exports.handler = argv => {

	const {
		name
	} = argv;

	const keepit = new Keepit();

	const packageWasRemoved = keepit.removePackage(name);

	if(packageWasRemoved)
		Printer.print(`Package ${name} removed from your list!`);
	else
		return Printer.print(`Package ${name} was not saved.`);
};
