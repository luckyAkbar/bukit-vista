const db = require("../models");

const createFavouriteMovieByUserID = async (userID, data) => {
  return await db.favourite_movies.create({
    user_id: userID,
    data,
  });
};

const findByUserID = async (userID) => {
  return await db.favourite_movies.findAll({
    where: {
      user_id: userID,
    },
  });
};

module.exports = {
  createFavouriteMovieByUserID,
  findByUserID,
};
