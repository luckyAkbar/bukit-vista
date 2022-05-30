require('dotenv').config();

const { env } = process;

module.exports = {
  username: env.PGUSER,
  password: env.PGPASSWORD,
  database: env.PGDATABASE,
  port: env.PGPORT,
  host: env.PGHOST,
  dialect: env.DBNAME,
  debug: env.LOG_LEVEL === 'debug',
  pool: {
    max: Number(env.DB_MAX_CONN_POOL) || 5,
    min: Number(env.DB_MIN_CONN_POOL) || 2,
  },
  seederStorage: 'sequelize',
};
