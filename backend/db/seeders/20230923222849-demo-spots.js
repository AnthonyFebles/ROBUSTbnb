"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await Spot.bulkCreate(
			[
				{
					ownerId: 1,
					address: "123 Disney Lane",
					city: "San Francisco",
					state: "Fakefornia",
					country: "United States of America",
					lat: 97.7645358,
					lng: -112.4730327,
					name: "App Academy",
					description: "Place where web developers are created",
					price: 1000,
				},
				{
					ownerId: 1,
					address: "111 Afternoon Ave",
					city: "San Francisco",
					state: "Fakefornia",
					country: "United States of America",
					lat: 17.7645358,
					lng: -102.4730327,
					name: "Not App Academy",
					description: "Place where web developers aren't created",
					price: 145,
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
					description: "Where Bulma does her research ",
					price: 9999,
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
