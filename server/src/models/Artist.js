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

  static get relationMappings() {
    const { User } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "movies.genreId",
          to: "genres.id"
        }
      }
    }
  }
}

module.exports = Artist