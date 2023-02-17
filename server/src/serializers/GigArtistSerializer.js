class GigArtistSerializer{
  static async getDetail(gig) {
    const allowedAttributes = ["id", "name", "date", "location", "time"]
    const serializedGigArtists = {}

    for (const attribute of allowedAttributes) {
      serializedGig[attribute] = gig[attribute]
    }

    const relatedArtists = await gig.$relatedQuery("artists")
    serializedGig.artists=relatedArtists

    return serializedGigArtists
  }
}

export default GigArtistSerializer