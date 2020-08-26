'use strict';

const Preferences = require('preferences');

const Normalizer = require('./package-normalizer');

let preferences;

module.exports = class Keepit {

	constructor() {
		if(!preferences) {
			preferences = new Preferences('keepit', {
				packages: []
			});
		}
	}

	list() {
		return preferences.packages || [];
	}

	async addPackage(packageIdentifier, description) {
		const normalizedPackage = await Normalizer.normalize(packageIdentifier, description);
		return this._addPackageNormalized(normalizedPackage);
	}

	removePackage(packageName) {
		const packageIndex = this.getPackageCurrentIndex({ name: packageName });

		if(packageIndex < 0)
			return false;

		preferences.packages.splice(packageIndex, 1);
		return true;
	}

	async _addPackageNormalized(normalizedPackage) {

		const packageIndex = this.getPackageCurrentIndex(normalizedPackage);

		if(packageIndex >= 0)
			return this.update(packageIndex, normalizedPackage);

		return this.add(normalizedPackage);
	}

	getPackageCurrentIndex(normalizedPackage) {
		return preferences.packages.findIndex(({ name: packageName }) => packageName === normalizedPackage.name);
	}

	update(packageIndex, normalizedPackage) {
		preferences.packages[packageIndex] = normalizedPackage;
	}

	add(normalizedPackage) {
		preferences.packages.push(normalizedPackage);
	}

};
