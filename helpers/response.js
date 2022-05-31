const OK = (res, data) => {
  return res.status(200).json(data);
};

const NotFound = (res, data) => {
  return res.status(404).json(data);
};

const Forbidden = (res) => {
  return res.status(403).json({
    message: "Access Forbidden",
  });
};

const BadRequest = (res, hint) => {
  return res.status(400).json({
    message: "Request failed",
    hint,
  });
};

const InternalServerError = (res) => {
  return res.sendStatus(500);
};

module.exports = {
  OK,
  NotFound,
  Forbidden,
  BadRequest,
  InternalServerError,
};
