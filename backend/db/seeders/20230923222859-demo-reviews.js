"use strict";

const { Review, sequelize } = require("../models");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}


module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		await Review.bulkCreate(options,
			[
				{
					userId: 1,
					spotId: 1,
					review: "this place is great :)",
					stars: 4,
				},
				{
					userId: 2,
					spotId: 1,
					review: "this place is ok",
					stars: 3,
				},
				{
					userId: 3,
					spotId: 1,
					review: "this place is good",
					stars: 3,
				},
				{
					userId: 1,
					spotId: 2,
					review: "this place is amazing :D",
					stars: 5,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				spotId: 1,
			},
			{}
		);
	},
};
