require("dotenv").config();

const app = require("../index");
const { logger } = require("../helpers/logger");

const port = process.env.HTTP_SERVER_PORT || 8000;
app.listen(port, () => {
  logger.info(`Server listening on PORT: ${port}`);
});
