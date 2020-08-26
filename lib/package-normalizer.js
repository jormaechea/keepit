'use strict';

const url = require('url');

const fetch = require('node-fetch');

const NPM_HOSTNAMES = [
	'www.npmjs.com',
	'npmjs.com'
];

const npmRegistryUrl = packageName => `https://registry.npmjs.org/${packageName}/latest`;

module.exports = class PackageNormalizer {

	static async normalize(packageIdentifier, description) {

		const packageUrl = this.getPackageUrl(packageIdentifier);
		const packageName = this.getPackageName(packageIdentifier);
		const packageDescription = await this.getPackageDescription(packageName, description);

		return {
			name: packageName,
			description: packageDescription,
			url: packageUrl
		};
	}

	static getPackageUrl(packageIdentifier) {
		const urlData = url.parse(packageIdentifier);

		if(urlData.hostname)
			return packageIdentifier;

		return this.getUrlFromName(packageIdentifier);
	}

	static getNameFromUrl(urlData) {
		return urlData.pathname.split('/').slice(-1)[0];
	}

	static getPackageName(packageIdentifier) {
		const urlData = url.parse(packageIdentifier);
		if(urlData.hostname)
			this.getNameFromUrl(packageIdentifier);

		return packageIdentifier;
	}

	static getUrlFromName(packageName) {
		const [hostname] = NPM_HOSTNAMES;

		return `https://${hostname}/package/${packageName}`;
	}

	static async getPackageDescription(packageName, description) {
		if(description)
			return description;

		const res = await fetch(npmRegistryUrl(packageName));

		if(!res.ok)
			throw new Error(`Failed to get ${packageName} from NPM registry`);

		const packageData = await res.json();

		return packageData.description;
	}
};
