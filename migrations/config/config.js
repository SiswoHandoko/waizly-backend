// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { env = {} } = process;
const {
  dialect = 'postgres',
  NODE_ENV: nodeEnv = 'development',
  POSTGRE_USER: username,
  POSTGRE_PASS: password,
  POSTGRE_HOST: host,
  POSTGRE_PORT: port,
  POSTGRE_DB_NAME: database
} = env;

module.exports = {
  [nodeEnv]: {
    dialect,
    username,
    password,
    host,
    port,
    database,
    migrationStorageTableName: `_migrations`
  }
};