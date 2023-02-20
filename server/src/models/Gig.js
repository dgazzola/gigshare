const Model = require("./Model")

class Gig extends Model {
  static get tableName() {
    return "gigs"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "date", "location", "time"],
      properties: {
        name:{type:"string"},
        date:{type:"string"},
        location:{type:"string"},
        time:{type:"string"}
      }
    }
  }

  static get relationMappings(){
    const { Artist, Lineup, Favorite, User } = require("./index.js")

    return {
      artists: {
        relation: Model.ManyToManyRelation,
        modelClass: Artist,
        join: {
          from:"gigs.id",
          through: {
            from: "lineups.gigId",
            to: "lineups.artistId"
          },
          to: "artists.id"
        }
      },
      lineups: {
        relation: Model.HasManyRelation,
        modelClass: Lineup,
        join: {
          from: "gigs.id",
          to:"lineups.gigId"
        }
      },
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: "gigs.id",
          to:"favorites.gigId"
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "gigs.id",
          through: {
            from: "favorites.gigId",
            to: "favorites.userId"
          },
          to: "users.id"
        }
      }

    }
  }

}

module.exports = Gig