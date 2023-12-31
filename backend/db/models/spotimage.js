'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {foreignKey : "spotId"})
    }
  }
  SpotImage.init(
		{
			url: DataTypes.STRING,
			spotId: DataTypes.INTEGER,
			isPreview: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "SpotImage",
			defaultScope: {
				// attributes: ["id", "name", "type", "storeId"],
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		}
	);
  return SpotImage;
};