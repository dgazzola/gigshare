import GigSerializer from "./GigSerializer.js"

class ArtistSerializer {

  static async getSummary(artist) {
    const allowedAttributes = ["id", "artistName", "genre", "mediaUrl"];
    let serializedArtist = {};
    
    for (const attribute of allowedAttributes) {
      serializedArtist[attribute] = artist[attribute];
    }
    
    return serializedArtist;
  }

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
    return serializedArtist
  }
  
}

export default ArtistSerializer