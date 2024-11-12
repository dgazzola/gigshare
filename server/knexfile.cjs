// At the top of knexfile.cjs

const path = require("path");
const getDatabaseUrl = require("./src/config/getDatabaseUrl.cjs");

const migrationPath = "src/db/migrations";
// console.log(getDatabaseUrl("development"));

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
    connection: {
      connectionString: getDatabaseUrl("production"),
      ssl: { rejectUnauthorized: false }, // Ensures SSL connection is allowed
    },
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