import { Gig } from "../../models/index.js"

class GigSeeder {

  static async seed() {
    const gigsData = [
      {name: "SUPAH", date:"11/27", city:"Boston", state:"MA", address:"replace", startTime:"5PM", endTime:"11PM"},
      {name: "FIYAH SHOW", date:"12/3", city:"Cambridge", state:"MA", address:"replace", startTime:"2PM", endTime:"11PM"},
      {name: "Coachella", date:"4/3", city:"Los Angeles", state:"CA", address:"replace", startTime:"5PM", endTime:"10PM"},
      {name: "Tomorrowland", date:"7/14", city:"Belgium", state:"IDK", address:"replace", startTime:"2PM", endTime:"9PM"},
      {name: "Hard Summer", date:"7/23", city:"Los Angeles", state:"CA", address:"replace", startTime:"6PM", endTime:"7PM"},
      {name: "Winter Ball", date:"1/3", city:"New York", state:"NY", address:"replace", startTime:"1PM", endTime:"6PM"},
      {name: "Cagofest", date:"12/3", city:"Chicago", state:"IL", address:"replace", startTime:"1PM", endTime:"11PM"},
      {name: "BeatBash", date:"12/3", city:"Atlanta", state:"GA", address:"replace", startTime:"4PM", endTime:"11PM"},
      {name: "EDC Orlando", date:"9/18", city:"Orlando", state:"FL", address:"replace", startTime:"3PM", endTime:"10PM"},
      {name: "Electric Forest", date:"6/25", city:"Grand Rapids", state:"MI", address:"replace", startTime:"3PM", endTime:"11PM"},
      {name: "Electric Zoo", date:"9/2", city:"New York", state:"NY", address:"replace", startTime:"1PM", endTime:"9PM"},
      {name: "Burning Man", date:"8/27", city:"Las Vegas", state:"NV", address:"replace", startTime:"12PM", endTime:"10PM"}
    ]

    for (const singleGigData of gigsData) {
        await Gig.query().insert(singleGigData)
    }

    console.log("gigs seeded")
  }
}

export default GigSeeder


