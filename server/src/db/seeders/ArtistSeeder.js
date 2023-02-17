import { Artist } from "../../models/index.js"

class ArtistSeeder {

  static async seed() {
    const artistsData = [
      {artistName: "100gecs", genre: "Hyperpop"},
      {artistName: "ZOLA", genre: "EDM", userId:1},
      {artistName: "Skrillex", genre: "EDM", userId:2},
      {artistName: "Porter Robinson", genre: "EDM"},
      {artistName: "Zedd", genre: "EDM"},
      {artistName: "savesomeone", genre: "Hyperpop"},
      {artistName: "glaive", genre: "Hyperpop"},
      {artistName: "H4RRIS", genre: "EDM"},
      {artistName: "Xandor", genre: "EDM"},
      {artistName: "midwxst", genre: "Hip-Hop"}
    ]

    for (const singleArtistData of artistsData) {
        await Artist.query().insert(singleArtistData)
    }
  }
}

export default ArtistSeeder



