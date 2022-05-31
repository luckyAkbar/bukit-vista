const apiResponse = require("../helpers/response");
const UserRepository = require("../repository/UserRepository");
const SessionRepository = require("../repository/SessionRepository");
const { decrypt } = require("../helpers/crypto");

const loadTokenFromHeader = function (req, res, next) {
  const bearer = req.headers["authorization"];
  if (!bearer) return next();

  try {
    req.token = bearer.split(" ")[1];
  } finally {
    return next();
  }
};

const loadUserIDFromToken = async function (req, res, next) {
  const token = req.token;
  if (!token) return next();

  const session = await SessionRepository.getSessionByAccessToken(token);
  if (!session) return apiResponse.Forbidden(res);

  req.userID = session.user_id;
  return next();
};

const authMiddleware = function (req, res, next) {
  // skip auth middleware if user want to login
  if (req.url == "/login") return next();
  if (!req.token || !req.userID) return apiResponse.Forbidden(res);
  return next();
};

const createNewSession = async (userID) => {
  const accessToken = Buffer.from(Math.random().toString())
    .toString("base64")
    .substr(10, 5);

  console.log(typeof userID);

  await SessionRepository.createSession(accessToken, Number(userID));
  return accessToken;
};

const handleLogin = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password)
    return apiResponse.BadRequest(res, "id and password can not empty");

  const user = await UserRepository.getUserById(id);
  if (!user) return apiResponse.Forbidden(res);

  const decryptedPassword = decrypt(user.password);
  if (decryptedPassword !== password)
    return apiResponse.BadRequest(res, "password not match");

  try {
    const token = await createNewSession(user.id);
    return apiResponse.OK(res, {
      token,
    });
  } catch (e) {
    console.log(e);
    return apiResponse.InternalServerError(res);
  }
};

module.exports = {
  authMiddleware,
  loadTokenFromHeader,
  loadUserIDFromToken,
  handleLogin,
};
