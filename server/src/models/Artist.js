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
        genre: {type: "string"},
        userId: {type: ["integer", "string"]},
        mediaUrl: {type: "string"}
      }
    }
  }

  static get relationMappings() {
    const { User, Gig, Lineup } = require("./index.js")
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "artists.userId",
          to: "users.id"
        }
      },
      gigs: {
        relation: Model.ManyToManyRelation,
        modelClass: Gig,
        join: {
          from: "artists.id",
          through: {
            from: "lineups.artistId",
            to: "lineups.gigId"
          },
          to: "gigs.id"
        }
      },
      lineups: {
        relation: Model.HasManyRelation,
        modelClass: Lineup,
        join: {
          from: "artists.id",
          to: "lineups.artistId"
        }
      }
    }
  }
}

module.exports = Artist