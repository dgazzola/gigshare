import { Artist } from "../../models/index.js"

class ArtistSeeder {

  static async seed() {
    const artistsData = [
      {artistName: "100 Gecs", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/100gecs/torture-me-feat-skrillex"},
      {artistName: "ZOLA", genre: "EDM", userId:1, mediaUrl: "https://soundcloud.com/zolamusicofficial/said-done-zola-x-savesomeone-1"},
      {artistName: "Skrillex", genre: "EDM", userId:2, mediaUrl: "https://soundcloud.com/skrillex/skrillex-bibi-bourelly-sonny-moore-dont-get-too-close"},
      {artistName: "Porter Robinson", genre: "EDM", mediaUrl: "https://www.youtube.com/watch?v=4SZEDBFPpgw"},
      {artistName: "Zedd", genre: "EDM"},
      {artistName: "savesomeone", genre: "Hyperpop"},
      {artistName: "glaive", genre: "Hyperpop"},
      {artistName: "H4RRIS", genre: "EDM"},
      {artistName: "Xandor", genre: "EDM", mediaUrl: "https://soundcloud.com/xandor/once-again-x-technologic-x-sticky-xandor-hrly-edit"},
      {artistName: "midwxst", genre: "Hip-Hop", mediaUrl: "https://www.youtube.com/watch?v=0G7QVPgFDhQ"}
    ]

    for (const singleArtistData of artistsData) {
        await Artist.query().insert(singleArtistData)
    }
  }
}

export default ArtistSeeder



