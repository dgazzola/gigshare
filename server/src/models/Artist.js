const Model = require("./Model")

class Artist extends Model {
  static get tableName() {
    return "artists"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["artistName"],
      properties: {
        artistName: {type: "string"},
        genre: {type: "string"}
      }
    }
  }

}

module.exports = Artist