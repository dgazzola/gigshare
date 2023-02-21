/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("gigs", table => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.string("date").notNullable()
    table.string("city").notNullable()
    table.string("address").notNullable()
    table.string("state").notNullable()
    table.string("startTime").notNullable()
    table.string("endTime").notNullable()
    // table
    // .bigInteger("hostId")
    // .unsigned()
    // .index()
    // .references("users.id").onDelete("CASCADE")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("gigs")
}
