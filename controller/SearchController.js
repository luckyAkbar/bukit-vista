const OMDB = require("../helpers/omdb");
const apiResponse = require("../helpers/response");

const search = async (req, res) => {
  const title = req.params.movieTitle;
  if (!title) {
    return res.status(400).json({ message: "movie title must not empty" });
  }

  const result = await OMDB.searchByTitle(title);
  if (result.Error) {
    return apiResponse.NotFound(res, {
      message: result.Error,
    });
  }

  return apiResponse.OK(res, result);
};

module.exports = {
  search,
};
