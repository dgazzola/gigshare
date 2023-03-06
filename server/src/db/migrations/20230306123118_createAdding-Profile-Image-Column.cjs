/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("users", (table) => {
    return table.string("profileImage").defaultTo("https://gigshare-development.s3.amazonaws.com/blank-profile-img.jpg")
  })
}
/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("users", (table) => {
    return table.dropColumn("profileImage")
  })
}
