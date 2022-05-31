const express = require("express");
const SearchController = require("./controller/SearchController");
const AuthController = require("./controller/AuthController");
const FavouriteMovieController = require("./controller/FavouriteMovieController");

const app = express();
const cookieParser = require("cookie-parser");
const { loggerMiddleware } = require("./helpers/logger");
const {
  loadTokenFromHeader,
  loadUserIDFromToken,
  authMiddleware,
} = require("./controller/AuthController");

const router = express.Router();

router.get("/", (req, res) => {
  return res.sendStatus(200);
});
router.post("/login", AuthController.handleLogin);
router.post("/movies/favourite", FavouriteMovieController.handleSave);
router.get("/movies/favourite", FavouriteMovieController.handleGet);
router.get(
  "/movies/favourite/posters",
  FavouriteMovieController.handleGetPostersOnly
);
router.get("/movies/:movieTitle", SearchController.search);

app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(loadTokenFromHeader);
app.use(loadUserIDFromToken);
app.use(authMiddleware);
app.use(router);

module.exports = app;
