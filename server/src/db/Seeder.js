/* eslint-disable no-console */
import { connection } from "../boot.js"
import { Gig, Artist, User } from "../models/index.js"

class Seeder {
  static async seed() {
    // include individual seed commands herea
    await User.query().insert({username:"dan", email:"dan@gmail.com", password:"dan"})
    await Gig.query().insert({name: "SUPAH", date:"11/27", location:"Boston", time:"5-7PM"})
    await Gig.query().insert({name: "FIYAH SHOW", date:"12/3", location:"Cambridge", time:"2-7PM"})
    await Gig.query().insert({name: "Coachella", date:"4/3", location:"Los Angeles", time:"5-11PM"})
    await Gig.query().insert({name: "Tomorrowland", date:"7/14", location:"Belgium", time:"2-11PM"})
    await Gig.query().insert({name: "EDC Orlando", date:"9/18", location:"Orlando", time:"3-4PM"})
    await Gig.query().insert({name: "Hard Summer", date:"7/23", location:"Los Angeles", time:"6-11PM"})
    await Gig.query().insert({name: "Winter Ball", date:"1/3", location:"New York", time:"1-11PM"})
    await Gig.query().insert({name: "Cagofest", date:"12/3", location:"Chicago", time:"1-7PM"})
    await Gig.query().insert({name: "BeatBash", date:"12/3", location:"Atlanta", time:"4-7PM"})
    await Artist.query().insert({artistName: "ZOLA", genre: "EDM", userId:1})
    await Artist.query().insert({artistName: "Skrillex", genre: "EDM"})
    await Artist.query().insert({artistName: "100gecs", genre: "Hyperpop"})
    await Artist.query().insert({artistName: "Porter Robinson", genre: "EDM"})
    await Artist.query().insert({artistName: "Zedd", genre: "EDM"})
    await Artist.query().insert({artistName: "savesomeone", genre: "Hyperpop"})
    await Artist.query().insert({artistName: "glaive", genre: "Hyperpop"})
    await Artist.query().insert({artistName: "H4RRIS", genre: "EDM"})
    await Artist.query().insert({artistName: "Xandor", genre: "EDM"})
    await Artist.query().insert({artistName: "midwxst", genre: "Hip-Hop"})

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder