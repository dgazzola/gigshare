const knex = require("knex");
const objection = require("objection");
const knexConfig = require("../../knexfile.cjs");

const environment = process.env.NODE_ENV || "development";
const knexConnection = knex(knexConfig[environment]);

objection.Model.knex(knexConnection);

module.exports = knexConnection;