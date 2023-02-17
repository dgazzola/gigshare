import { Gig } from "../../models/index.js"

class GigSeeder {

  static async seed() {
    const gigsData = [
      {name: "SUPAH", date:"11/27", location:"Boston", time:"5-7PM"},
      {name: "FIYAH SHOW", date:"12/3", location:"Cambridge", time:"2-7PM"},
      {name: "Coachella", date:"4/3", location:"Los Angeles", time:"5-11PM"},
      {name: "Tomorrowland", date:"7/14", location:"Belgium", time:"2-11PM"},
      {name: "Hard Summer", date:"7/23", location:"Los Angeles", time:"6-11PM"},
      {name: "Winter Ball", date:"1/3", location:"New York", time:"1-11PM"},
      {name: "Cagofest", date:"12/3", location:"Chicago", time:"1-7PM"},
      {name: "BeatBash", date:"12/3", location:"Atlanta", time:"4-7PM"},
      {name: "EDC Orlando", date:"9/18", location:"Orlando", time:"3-4PM"},
      {name: "Electric Forest", date:"6/25", location:"Michigan", time:"3-9PM"},
      {name: "Electric Zoo", date:"9/2", location:"New York", time:"1-4PM"},
      {name: "Burning Man", date:"8/27", location:"Nevada", time:"12-8PM"}
    ]

    for (const singleGigData of gigsData) {
        await Gig.query().insert(singleGigData)
    }

    console.log("gigs seeded")
  }
}

export default GigSeeder


