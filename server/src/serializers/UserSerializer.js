import Artist from "../models/index.js"
import User from "../models/index.js"
import { Gig, Favorite}  from "../models/index.js"

class UserSerializer {
  static async getSummary(user) {
    const allowedAttributes = ["id", "email", "username", "createdAt"]
    const serializedUser={}

    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    const relatedArtist = await user.$relatedQuery("artists")
    serializedUser.artist = relatedArtist
    const favoritedGigs = await user.$relatedQuery("gigs").where('userId', '=', `${user.id}`)
    serializedUser.favoriteGigs = favoritedGigs

    const hostedGigs = await Gig.query().where('hostId', '=', `${user.id}`)
    serializedUser.hostedGigs = hostedGigs

    return serializedUser
  }
}

export default UserSerializer