import { Gig } from "../../models/index.js"

class GigSeeder {

  static async seed() {
    const gigsData = [
      {name: "Lollapalooza", date:"11-27-2024", city:"Chicago", state:"IL", address:"Grant Park", startTime:"5PM", endTime:"11PM", hostId:1},
      {name: "Rolling Loud", date:"12-03-2024", city:"Inglewood", state:"CA", address:"Hollywood Park Grounds", startTime:"2PM", endTime:"11PM", hostId:1},
      {name: "Coachella", date:"04-03-2024", city:"Indio", state:"CA", address:"Empire Polo Club", startTime:"5PM", endTime:"10PM", hostId:1},
      {name: "Ultra Music Festival", date:"07-14-2024", city:"Miami", state:"FL", address:"", startTime:"2PM", endTime:"9PM", hostId:1},
      {name: "Hard Summer", date:"07-23-2024", city:"Los Angeles", state:"CA", address:"", startTime:"6PM", endTime:"7PM", hostId:2},
      {name: "Winter Ball", date:"01-03-2024", city:"New York", state:"NY", address:"", startTime:"1PM", endTime:"6PM", hostId:2},
      {name: "Austin City Limits", date:"12-03-2024", city:"Austin", state:"TX", address:"Zilker Park", startTime:"1PM", endTime:"11PM", hostId:2},
      {name: "Bonnaroo", date:"12-03-2024", city:"Manchester", state:"TN", address:"Great Stage Park", startTime:"4PM", endTime:"11PM", hostId:2},
      {name: "EDC Orlando", date:"09-18-2024", city:"Orlando", state:"FL", address:"", startTime:"3PM", endTime:"10PM", hostId:2},
      {name: "Electric Forest", date:"06-25-2024", city:"Rothbury", state:"MI", address:"", startTime:"3PM", endTime:"11PM", hostId:2},
      {name: "Electric Zoo", date:"09-02-2024", city:"New York", state:"NY", address:"Randall's Island Park", startTime:"1PM", endTime:"9PM", hostId:2},
      {name: "Electric Daisy Carnival", date:"08-27-2024", city:"Las Vegas", state:"NV", address:"Las Vegas Boulevard", startTime:"12PM", endTime:"10PM"},
      {name: "Imagine Music Festival", date:"09-15-2024", city:"Rome", state:"GA", address:"Kingston Downs", startTime:"12PM", endTime:"10PM"},
      {name: "Electric Daisy Carnival", date:"08-27-2024", city:"Las Vegas", state:"NV", address:"Las Vegas Boulevard", startTime:"12PM", endTime:"10PM"},
      {name: "Beyond Wonderland", date:"09-15-2024", city:"Seattle", state:"WA", address:"The Gorge Ampitheatre", startTime:"12PM", endTime:"10PM"},
      {name: "Groove Cruise", date:"01-19-2024", city:"Miami", state:"FL", address:"", startTime:"12AM", endTime:"1PM"},
      {name: "Lost Lands", date:"09-01-2024", city:"Thornville", state:"OH", address:"", startTime:"12AM", endTime:"1AM"},
      {name: "Camp Bisco", date:"07-12-2024", city:"Scranton", state:"PA", address:"Montage Mountain", startTime:"12PM", endTime:"3AM"},
      {name: "Governor's Ball", date:"06-15-2024", city:"New York", state:"NY", address:"Randall's Island Park", startTime:"12AM", endTime:"1AM"},
      {name: "Lights All Night", date:"12-29-2024", city:"Dallas", state:"TX", address:"", startTime:"12AM", endTime:"5PM"},
      {name: "Dreamstate", date:"11-18-2024", city:"San Diego", state:"CA", address:"Randall's Island Park", startTime:"11AM", endTime:"3AM"},
      {name: "Global Dance Festival", date:"07-18-2024", city:"Denver", state:"CO", address:"Sport's Authority Field", startTime:"10AM", endTime:"4AM"},
      {name: "Lightning in a Bottle", date:"05-24-2024", city:"Kern County", state:"CA", address:"Buena Vista Lake", startTime:"10AM", endTime:"4AM"},
      {name: "Decadence", date:"12-29-2024", city:"Chandler", state:"AZ", address:"", startTime:"10AM", endTime:"2AM"}
    ]

    for (const singleGigData of gigsData) {
        await Gig.query().insert(singleGigData)
    }

    console.log("gigs seeded")
  }
}

export default GigSeeder