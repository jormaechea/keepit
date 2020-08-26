'use strict';

const CliTable = require('cli-table3');
const terminalLink = require('terminal-link');

module.exports = class Printer {

	static print(message) {
		// eslint-disable-next-line no-console
		console.log(message);
	}

	static printPackagesList(list) {

		if(!list.length)
			return this.print('No packages matching your search criteria. You can save more packages running `keepit add`');

		const table = new CliTable({
			head: ['Name', 'Description', 'Url']
		});

		table.push(...list.map(p => [p.name, p.description, terminalLink('View on npm', p.url)]));

		// eslint-disable-next-line no-console
		console.log(table.toString());
	}

};
