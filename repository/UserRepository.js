const db = require("../models");
const logger = require("../helpers/logger");

const getUserById = async (id) => {
  try {
    const user = await db.users.findOne({
      where: {
        id,
      },
    });

    return user;
  } catch (e) {
    logger.error(e);
    return;
  }
};

module.exports = {
  getUserById,
};
