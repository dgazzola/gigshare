/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "username"],

      properties: {
        email: { type: "string" },
        username: { type: "string" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Favorite, Artist, Gig} = require("./index.js")

    return {
      artists: {
        relation: Model.HasManyRelation,
        modelClass: Artist,
        join: {
          from:"users.id",
          to: "artists.userId"
        }
      },
      favorites: {
        relation: Model.HasManyRelation,
        modelClass: Favorite,
        join: {
          from: "users.id",
          to:"favorites.userId"
        }
      },
      favoritedGigs: {
        relation: Model.ManyToManyRelation,
        modelClass: Gig,
        join: {
          from: "users.id",
          through: {
            from: "favorites.userId",
            to: "favorites.gigId"
          },
          to: "gigs.id"
        }
      },
      hostedGigs: {
        relation: Model.HasManyRelation,
        modelClass: Gig,
        join: {
          from: "users.id",
          to: "gigs.hostId"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
