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

}

module.exports = Gig