/* eslint-disable no-console */
import { connection } from "../boot.js"
import { Gig, Artist } from "../models/index.js"

class Seeder {
  static async seed() {
    // include individual seed commands herea
    await Gig.query().insert({name: "SUPAH", date:"11/27", location:"Boston", time:"5-7PM"})
    await Gig.query().insert({name: "FIYAH SHOW", date:"12/3", location:"Cambridge", time:"2-7PM"})
    await Artist.query().insert({artistName: "ZOLA", genre: "EDM"})
    await Artist.query().insert({artistName: "Skrillex", genre: "EDM"})
    await Artist.query().insert({artistName: "savesomeone", genre: "Hyperpop"})

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder