const Model = require("./Model")

class Gig extends Model {
  static get tableName() {
    return "gigs"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "date", "address", "city", "state", "startTime", "endTime"],
      properties: {
        name:{type:"string"},
        date:{type:"string"},
        address:{type:"string"},
        city:{type:"string"},
        state:{type:"string"},
        startTime:{type:"string"},
        endTime:{type:"string"}
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
      },
      // user: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: User,
      //   join: {
      //     from: "gigs.hostId",
      //     to: "users.id"
      //   }
      // }

    }
  }

}

module.exports = Gig