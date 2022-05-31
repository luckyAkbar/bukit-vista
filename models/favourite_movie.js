"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favourite_Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* define associations here */
    }
  }
  Favourite_Movie.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
        primaryKey: true,
      },
      data: {
        type: DataTypes.TEXT,
        get() {
          return JSON.parse(this.getDataValue("data"));
        },
      },
      user_id: {
        type: DataTypes.UUID,
        references: { model: "User", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "favourite_movies",
    }
  );
  return Favourite_Movie;
};
