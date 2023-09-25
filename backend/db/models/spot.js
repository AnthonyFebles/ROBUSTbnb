'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.belongsTo(models.User, { foreignKey: "ownerId" })
    }
  }
  Spot.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
        unique: true,
        validate: {
          len: [10, 100],
        }
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lat: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			lng: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
        unique: true
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
        validate: {
          len: [10, 256]
        }
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			avgRating: {
				type: DataTypes.INTEGER,
				allowNull: false,
        defaultValue: 0
			},
      previewImage: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      }
		},
		{
			sequelize,
			modelName: "Spot",
		}
	);
  return Spot;
};