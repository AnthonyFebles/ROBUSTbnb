"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "Spots";
		return queryInterface.bulkInsert(options,
			[
				{
					ownerId: 1,
					address: "720 Hokage Lane ",
					city: "Hidden Leaf",
					state: "Village",
					country: "Japan",
					lat: 89.7645358,
					lng: -112.4730327,
					name: "Hokage Mansion",
					description: "The actual mansion where the Hokage lives. With times being so peaceful we have decided to rent out the mansion to help keep the village treasury healthy",
					price: 10000,
				},
				{
					ownerId: 1,
					address: "666 Forest Place",
					city: "Hell",
					state: "Michigan",
					country: "United States of America",
					lat: 17.7645358,
					lng: -102.4730327,
					name: "A Cabin In The Woods",
					description: "Just a cabin in the woods. Definitely not haunted. We are not liable for any loss of souls or future costs of exorcisms after staying a night here. Family friendly, no smoking please.",
					price: 1,
				},
				{
					ownerId: 2,
					address: "WST 3338926 K",
					city: "West City",
					state: "Fakefornia",
					country: "United States of America",
					lat: 67.7645358,
					lng: -125.4730327,
					name: "Capsule Corp",
					description: "Where Bulma does her research. We do have to mention that the local dead beat dad will come and pick a fight with you if you're a decent fighter. We don't know how he can tell, he just can. ",
					price: 9001,
				},
				{
					ownerId: 3,
					address: "123 Disney Lane ",
					city: "Anaheim",
					state: "Kalifornia",
					country: "United States of America",
					lat: 35.7645358,
					lng: 35.4730327,
					name: "Disney Land",
					description: "It's the entire Disney Land. Rent out the whole park",
					price: 350000,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				state: { [Op.in]: ["Fakefornia"] },
			},
			{}
		);
	},
};
