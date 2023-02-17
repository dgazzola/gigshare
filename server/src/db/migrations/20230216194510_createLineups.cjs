/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("lineups", table => {
    table.bigIncrements("id")
    table.bigInteger("artistId").unsigned().index().notNullable().references("artists.id").onDelete("CASCADE")
    table.bigInteger("gigId").unsigned().index().notNullable().references("gigs.id").onDelete("CASCADE")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("lineups")
}
