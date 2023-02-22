import { Gig } from "../../../models/index.js"

class GigSerializer{
  static async getDetail(gig) {
    const allowedAttributes = ["id", "name", "date", "startTime", "endTime", "address", "city", "state", "hostId"]
    const serializedGig = {}

    for (const attribute of allowedAttributes) {
      serializedGig[attribute] = gig[attribute]
    }

    return serializedGig
  }
}

export default GigSerializer