/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("artists", table => {
    table.bigIncrements("id")
    table.bigInteger("userId").unsigned().index().references("users.id").onDelete("CASCADE")
    table.string("artistName").notNullable()
    table.string("genre").notNullable()
    table.string("mediaUrl")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("artists")
}