let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Review, sequelize } = require("../models");

module.exports = {
	async up(queryInterface, Sequelize) {
		await Review.bulkCreate(
			[
				{
					userId: 1,
					spotId: 1,
					review: "this place isn't great",
					stars: 3,
				},
				{
					userId: 2,
					spotId: 1,
					review: "this place isn't great",
					stars: 1,
				},
				{
					userId: 3,
					spotId: 1,
					review: "this place isn't great",
					stars: 3,
				},
				{
					userId: 1,
					spotId: 1,
					review: "this place isn't great",
					stars: 4,
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Reviews";
		const Op = sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				spotId: 1,
			},
			{}
		);
	},
};
