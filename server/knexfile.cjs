const path = require("path");
const getDatabaseUrl = require("./src/config/getDatabaseUrl.cjs");

const migrationPath = path.join(__dirname, "src/db/migrations");

module.exports = {
  development: {
    client: "pg",
    connection: getDatabaseUrl("development"),
    migrations: {
      directory: migrationPath,
      extension: "cjs",
      stub: path.join(migrationPath, "migration.stub.cjs"),
    },
  },
  production: {
    client: "pg",
    connection: getDatabaseUrl("production"),
    migrations: {
      directory: migrationPath,
      extension: "cjs",
      stub: path.join(migrationPath, "migration.stub.cjs"),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
