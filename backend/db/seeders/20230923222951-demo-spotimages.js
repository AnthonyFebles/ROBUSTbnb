

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const { SpotImage, sequelize } = require("../models");

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = "SpotImages";
		return queryInterface.bulkInsert(options, [
			{
				url: "https://tinypic.host/images/2023/11/06/App_Academy_Building.jpeg",
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
			{
				url: "https://i.imgur.com/f9iJGg7.jpg",
				spotId: 2,
				isPreview: true,
			},
			{
				url: "https://tinypic.host/images/2023/11/06/Capsule_Corp.webp",
				spotId: 3,
				isPreview: true,
			},
			{
				url: "https://tinypic.host/images/2023/11/06/Capsule_Corporation.webp",
				spotId: 4,
				isPreview: true,
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
