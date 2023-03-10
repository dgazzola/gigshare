import GigSerializer from "./GigSerializer.js"

class ArtistSerializer {
  static async getDetail(artist){
    const allowedAttributes = ["id", "artistName", "genre", "userId", "mediaUrl"]
    let serializedArtist = {}
    for (const attribute of allowedAttributes) {
      serializedArtist[attribute] = artist[attribute]
    }

    const relatedGigs = await artist.$relatedQuery("gigs")
    const serializedGigs = await Promise.all(
      relatedGigs.map(async(gig) => await GigSerializer.getDetail(gig))
    )

    serializedArtist.gigs = serializedGigs
  }
}

export default ArtistSerializer