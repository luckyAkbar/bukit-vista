const db = require("../models");

const createSession = async (token, userID) => {
  return await db.session.create({
    access_token: token,
    user_id: userID,
  });
};

const getSessionByAccessToken = async (access_token) => {
  return await db.session.findOne({
    where: {
      access_token,
    },
  });
};

module.exports = {
  createSession,
  getSessionByAccessToken,
};
