"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

// module.exports = {
// 	async up(queryInterface, Sequelize) {
// 		options.tableName = "Users";
// 		await User.bulkCreate(options,
// 			[
// 				{
// 					email: "demo@user.io",
// 					username: "Isa-Demo",
// 					hashedPassword: bcrypt.hashSync("password"),
// 					firstName: "Joel",
// 					lastName: "Schmoe"
// 				},
// 				{
// 					email: "user1@user.io",
// 					username: "FakeUser1",
// 					hashedPassword: bcrypt.hashSync("password"),
// 					firstName: "Joes",
// 					lastName: "Schmoes"
// 				},
// 				{
// 					email: "user2@user.io",
// 					username: "FakeUser2",
// 					hashedPassword: bcrypt.hashSync("password"),
// 					firstName: "Jose",
// 					lastName: "Schmose"
// 				},
// 			],
// 			{ validate: true }
// 		);
// 	},
module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "Users";
		return queryInterface.bulkInsert(
			options,
			[
				{
					email: "demo@user.io",
					username: "Isa-Demo",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Joel",
					lastName: "Schmoe",
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Joes",
					lastName: "Schmoes",
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Jose",
					lastName: "Schmose",
				},
				{
					email: "user3@user.io",
					username: "KingJames",
					hashedPassword: bcrypt.hashSync("password"),
					firstName: "Lebron",
					lastName: "James",
				},
			],
			{ validate: true }
		);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Users";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: { [Op.in]: ["Isa-Demo", "FakeUser1", "FakeUser2", "KingJames"] },
			},
			{}
		);
	},
};
