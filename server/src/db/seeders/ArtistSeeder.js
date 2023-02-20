import { Artist } from "../../models/index.js"

class ArtistSeeder {

  static async seed() {
    const artistsData = [
      {artistName: "100 Gecs", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/100gecs/torture-me-feat-skrillex"},
      {artistName: "ZOLA", genre: "EDM", userId:1, mediaUrl: "https://soundcloud.com/zolamusicofficial/said-done-zola-x-savesomeone-1"},
      {artistName: "Skrillex", genre: "EDM", userId:2, mediaUrl: "https://soundcloud.com/skrillex/skrillex-bibi-bourelly-sonny-moore-dont-get-too-close"},
      {artistName: "Porter Robinson", genre: "EDM", mediaUrl: "https://www.youtube.com/watch?v=4SZEDBFPpgw"},
      {artistName: "Zedd", genre: "EDM", mediaUrl: "https://soundcloud.com/zedd/stay"},
      {artistName: "savesomeone", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/chrislolz/what-a-joke"},
      {artistName: "glaive", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/1glaive/3-wheels-and-it-still-drives?si=f2c6ffe561c947f5ba10200d590c626a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "H4RRIS", genre: "EDM", mediaUrl: "https://soundcloud.com/mkcofficial/h4rris-mkc-worth-it-ft-dianna?si=f2c6ffe561c947f5ba10200d590c626a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Xandor", genre: "EDM", mediaUrl: "https://soundcloud.com/xandor/once-again-x-technologic-x-sticky-xandor-hrly-edit"},
      {artistName: "midwxst", genre: "Hip-Hop", mediaUrl: "https://www.youtube.com/watch?v=0G7QVPgFDhQ"}
    ]

    for (const singleArtistData of artistsData) {
        await Artist.query().insert(singleArtistData)
    }
  }
}

export default ArtistSeeder



