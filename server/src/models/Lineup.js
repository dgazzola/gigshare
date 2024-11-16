const Model = require("./Model")

class Lineup extends Model {
  static get tableName(){
    return "lineups"
  }

  static get relationMappings(){
    const { Gig, Artist } = require("./index.js")

    return {
      gig: {
        relation: Model.BelongsToOneRelation,
        modelClass: Gig, 
        join: {
          from: "lineups.gigId",
          to: "gigs.id"
        }
      },
      artist: {
        relation: Model.BelongsToOneRelation,
        modelClass: Artist,
        join: {
          from: "lineups.artistId",
          to: "artists.id"
        }
      }
    }
  }
}

module.exports = Lineup