class GigSerializer {
  static async getDetail(gig) {
    const allowedAttributes = ["id", "name", "date", "startTime", "endTime", "address", "city", "state", "hostId"]
    const serializedGig = {}

    for (const attribute of allowedAttributes) {
      serializedGig[attribute] = gig[attribute]
    }

    serializedGig.artists = await gig.$relatedQuery("artists")
    serializedGig.favorited = await gig.$relatedQuery("users")
    serializedGig.isUserFavorite=false

    return serializedGig
  }
}

export default GigSerializer