"use strict";
/* @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Spots",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				ownerId: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				address: {
					type: Sequelize.STRING(100),
					allowNull: false,
					unique: true,
				},
				city: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				state: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				country: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				lat: {
					type: Sequelize.FLOAT,
					allowNull: false,
				},
				lng: {
					type: Sequelize.FLOAT,
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING(50),
					allowNull: false,
					unique: true,
				},
				description: {
					type: Sequelize.STRING(256),
					allowNull: false,
				},
				price: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				avgRating: {
					type: Sequelize.INTEGER,
					defaultValue: 0,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				previewImage: {
					type: Sequelize.STRING,
					allowNull: true,
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Spots";
		await queryInterface.dropTable(options);
	},
};
