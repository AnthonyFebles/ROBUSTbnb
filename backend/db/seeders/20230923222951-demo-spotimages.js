let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const { SpotImage, sequelize } = require("../models");

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		await SpotImage.bulkCreate(options, [
			{
				url: "image.url",
				spotId: 1,
				isPreview: true,
			},
			{
				url: "images.url",
				spotId: 1,
				isPreview: false,
			},
			{
				url: "images.urls",
				spotId: 1,
				isPreview: false,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
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
