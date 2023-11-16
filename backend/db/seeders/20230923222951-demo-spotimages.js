

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
				url: "https://tinypic.host/images/2023/11/16/preview.jpeg",
				spotId: 1,
				isPreview: true,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/hokage_residence_mansion_by_masterchristian_df82wui-pre.jpeg",
				spotId: 1,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview2.jpeg",
				spotId: 1,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview3.jpeg",
				spotId: 1,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/Capsule_Corp_2023-11-16-150723.png",
				spotId: 3,
				isPreview: true,
			},
			{
				url: "https://tinypic.host/images/2023/11/06/Capsule_Corp.webp",
				spotId: 3,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview3e03fe4eaa673bc7a.jpeg",
				spotId: 3,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview2.png",
				spotId: 3,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview4.jpeg",
				spotId: 3,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/cabin-in-the-woods.jpeg",
				spotId: 2,
				isPreview: true,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview1.png",
				spotId: 2,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview296c8459085143518.png",
				spotId: 2,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview3a83891d0a8da7a58.png",
				spotId: 2,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview47679ce588360813f.jpeg",
				spotId: 2,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/Disney_converted2_d20cae6a-87aa-46bb-9675-2b138fe3d6db.jpeg",
				spotId: 4,
				isPreview: true,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview1.jpeg",
				spotId: 4,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview220c604da6a55ed56.png",
				spotId: 4,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview30cfa7ceaf59f34d4.png",
				spotId: 4,
				isPreview: false,
			},
			{
				url: "https://tinypic.host/images/2023/11/16/preview4.png",
				spotId: 4,
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
