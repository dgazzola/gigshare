const Model = require("./Model")

class Favorite extends Model {
  static get tableName(){
    return "favorites"
  }

   static get relationMappings(){
    const { User, Gig } = require("./index.js")

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User, 
        join: {
          from: "favorites.userId",
          to: "users.id"
        }
      },
      gig: {
        relation: Model.BelongsToOneRelation,
        modelClass: Gig,
        join: {
          from: "favorites.gigId",
          to: "gigs.id"
        }
      }
    }
  }
}

module.exports = Favorite