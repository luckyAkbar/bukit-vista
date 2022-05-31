require("dotenv").config();

const axios = require("axios").default;

const OMDB_URL = process.env.OMDB_API_URL || "http://www.omdbapi.com/";
const OMDB_ID = process.env.OMDB_ID;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

const searchByTitle = async (title) => {
  const result = await axios.get(OMDB_URL, {
    params: {
      // OMDB id
      i: OMDB_ID,
      apikey: OMDB_API_KEY,
      // search parameter
      s: title,
    },
  });

  return result.data;
};

const searchByImdbID = async (imdbID) => {
  const result = await axios.get(OMDB_URL, {
    params: {
      // OMDB id
      i: OMDB_ID,
      apikey: OMDB_API_KEY,
      // find by imdbID parameter
      i: imdbID,
    },
  });

  if (result.data.Error) throw new Error(result.data.Error);

  return result.data;
};

module.exports = {
  searchByTitle,
  searchByImdbID,
};
