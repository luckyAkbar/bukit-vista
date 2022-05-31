const apiResponse = require("../helpers/response");
const omdb = require("../helpers/omdb");
const FafouriteMovieRepository = require("../repository/FafouriteMovieRepository");

const handleSave = async (req, res) => {
  const { imdbID } = req.body;
  if (!imdbID)
    return apiResponse.BadRequest(res, "imdbID value must not empty");

  try {
    const data = await omdb.searchByImdbID(imdbID);
    await FafouriteMovieRepository.createFavouriteMovieByUserID(
      req.userID,
      JSON.stringify(data)
    );

    apiResponse.OK(res, {
      message: "Success saving your favourite movie.",
      detail: data,
    });
  } catch (e) {
    console.log(e);
    return apiResponse.BadRequest(res, e.message);
  }
};

const handleGet = async (req, res) => {
  const userID = req.userID;
  const result = await FafouriteMovieRepository.findByUserID(userID);

  return apiResponse.OK(res, {
    list: result,
  });
};

const filterPosterOnly = (list) => {
  const posters = [];
  list.forEach((movie) => {
    posters.push(movie.data.Poster);
  });

  return posters;
};

const handleGetPostersOnly = async (req, res) => {
  const userID = req.userID;
  const result = await FafouriteMovieRepository.findByUserID(userID);
  const posters = filterPosterOnly(result);

  return apiResponse.OK(res, {
    posters,
  });
};

module.exports = {
  handleSave,
  handleGet,
  handleGetPostersOnly,
};
