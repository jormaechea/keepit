'use strict';

const Fuse = require('fuse.js');

const { Keepit } = require('..');
const Printer = require('../printer');

const fuse = new Fuse([], {
	findAllMatches: true,
	threshold: 0.3,
	keys: ['name', 'description']
});

const handlePackagesFilter = (packages, filter) => {

	if(!filter)
		return Printer.printPackagesList(packages);

	fuse.setCollection(packages);
	const filteredPackages = fuse.search(filter)
		.map(({ item }) => item);

	return Printer.printPackagesList(filteredPackages);
};

module.exports.command = ['list', 'ls'];

module.exports.describe = 'List your saved packages';

module.exports.builder = yargs => {

	return yargs
		.option('filter', {
			alias: 'f',
			description: 'A string to filter your saved packages',
			type: 'string'
		})
		.help();
};

module.exports.handler = argv => {

	const {
		filter
	} = argv;

	const keepit = new Keepit();

	const packages = keepit.list();

	return handlePackagesFilter(packages, filter);
};
