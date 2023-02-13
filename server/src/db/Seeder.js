/* eslint-disable no-console */
import { connection } from "../boot.js"
import { Gig, Artist } from "../models/index.js"

class Seeder {
  static async seed() {
    // include individual seed commands herea
    await Gig.query().insert({name: "SUPAH", date:"11/27", location:"Boston", time:"5-7PM"})
    await Gig.query().insert({name: "FIYAH SHOW", date:"12/3", location:"Cambridge", time:"2-7PM"})
    await Gig.query().insert({name: "Coachella", date:"4/3", location:"Los Angeles", time:"5-11PM"})
    await Gig.query().insert({name: "Tomorrowland", date:"7/14", location:"Belgium", time:"2-11PM"})
    await Gig.query().insert({name: "EDC Orlando", date:"9/18", location:"Orlando", time:"3-4PM"})
    await Gig.query().insert({name: "Hard Summer", date:"7/23", location:"Los Angeles", time:"6-11PM"})
    await Gig.query().insert({name: "Winter Ball", date:"1/3", location:"New York", time:"1-11PM"})
    await Gig.query().insert({name: "Cagofest", date:"12/3", location:"Chicago", time:"1-7PM"})
    await Gig.query().insert({name: "BeatBash", date:"12/3", location:"Atlanta", time:"4-7PM"})
    await Artist.query().insert({artistName: "ZOLA", genre: "EDM"})
    await Artist.query().insert({artistName: "Skrillex", genre: "EDM"})
    await Artist.query().insert({artistName: "savesomeone", genre: "Hyperpop"})

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder