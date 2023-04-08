import { Artist } from "../../models/index.js"

class ArtistSeeder {

  static async seed() {
    const artistsData = [
      {artistName: "100 Gecs", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/100gecs/torture-me-feat-skrillex"},
      {artistName: "347 Aidan", genre: "Indie", mediaUrl: "https://soundcloud.com/aidan-fuller-214446787/memories?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "ZOLA", genre: "EDM", userId:1, mediaUrl: "https://soundcloud.com/zolamusicofficial/said-done-zola-x-savesomeone-1"},
      {artistName: "Skrillex", genre: "EDM", userId:2, mediaUrl: "https://soundcloud.com/skrillex/skrillex-bibi-bourelly-sonny-moore-dont-get-too-close"},
      {artistName: "Porter Robinson", genre: "EDM", mediaUrl: "https://www.youtube.com/watch?v=4SZEDBFPpgw"},
      {artistName: "Zedd", genre: "EDM", mediaUrl: "https://soundcloud.com/zedd/stay"},
      {artistName: "savesomeone", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/chrislolz/what-a-joke"},
      {artistName: "glaive", genre: "Hyperpop", mediaUrl: "https://soundcloud.com/1glaive/3-wheels-and-it-still-drives?si=f2c6ffe561c947f5ba10200d590c626a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "H4RRIS", genre: "EDM", mediaUrl: "https://soundcloud.com/mkcofficial/h4rris-mkc-worth-it-ft-dianna?si=f2c6ffe561c947f5ba10200d590c626a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Xandor", genre: "EDM", mediaUrl: "https://soundcloud.com/xandor/once-again-x-technologic-x-sticky-xandor-hrly-edit"},
      {artistName: "midwxst", genre: "Hip-Hop", mediaUrl: "https://www.youtube.com/watch?v=0G7QVPgFDhQ"},
      {artistName: "Former Hero", genre: "EDM", mediaUrl: "https://soundcloud.com/formerhero/undertow"},
      {artistName: "Protohype", genre: "EDM", mediaUrl: "https://soundcloud.com/protohype/run-cried-the-crawling"},
      {artistName: "Shadient", genre: "EDM", mediaUrl: "https://soundcloud.com/shadient/ghostvoices-edit"},
      {artistName: "Hex Cougar", genre: "EDM", mediaUrl: "https://soundcloud.com/mrsuicidesheep/hex-cougar-sweet-dreams"},
      {artistName: "k?d", genre: "EDM", mediaUrl: "https://soundcloud.com/whoskid/lose-myself-ft-phil-good"},
      {artistName: "_chris elrik", genre: "EDM", mediaUrl: "https://soundcloud.com/inextremis/interact"},
      {artistName: "Lil Uzi Vert", genre: "Hip-Hop", mediaUrl: "https://soundcloud.com/liluzivert/lil-uzi-vert-just-wanna-rock"},
      {artistName: "Tisoki", genre: "EDM", mediaUrl: "https://soundcloud.com/tisoki/noho"},
      {artistName: "Flux Pavilion", genre: "EDM", mediaUrl: "https://soundcloud.com/flux-pavilion/flux-pavilion-i-cant-stop"},
      {artistName: "Juice WRLD", genre: "Hip-Hop", mediaUrl: "https://soundcloud.com/uiceheidd/fast"},
      {artistName: "Boombox Cartel", genre: "EDM", mediaUrl: "https://soundcloud.com/maddecent/nghtmre-boombox-cartel-aftershock"},
      {artistName: "Oliverse", genre: "EDM", mediaUrl: "https://soundcloud.com/oliverse/sets/tisoki-oliverse-new-life-feat"},
      {artistName: "RL Grime", genre: "EDM", mediaUrl: "https://soundcloud.com/rlgrime/nero-renegade"},
      {artistName: "4B", genre: "EDM", mediaUrl: "https://soundcloud.com/dj4b/something-just-like-this-4b-remix"},
      {artistName: "Slushii", genre: "EDM", mediaUrl: "https://soundcloud.com/slushiimusic/i-dont-miss-u"},
      {artistName: "GHASTLY", genre: "EDM", mediaUrl: "https://soundcloud.com/ghastly/we-might-fall-ghastly-x-matthew-koma"},
      {artistName: "Papa Khan", genre: "EDM", mediaUrl: "https://soundcloud.com/joytimecollective/papa-khan-rain"},
      {artistName: "Yung Lean", genre: "Emo", mediaUrl: "https://soundcloud.com/axeluano/yung-lean-summertime-blood"},
      {artistName: "BAYNK", genre: "Electronic", mediaUrl: "https://soundcloud.com/baynk/water"},
      {artistName: "Flume", genre: "Electronic", mediaUrl: "https://soundcloud.com/flume/the-difference-feat-toro-y-moi"},
      {artistName: "Mura Masa", genre: "Electronic", mediaUrl: "https://soundcloud.com/muramasamusic/love-ick"},
      {artistName: "Chance The Rapper", genre: "Hip-Hop", mediaUrl: "https://soundcloud.com/chancetherapper/all-night-feat-knox-fortune"},
      {artistName: "ericdoa", genre: "Hip-Hop", mediaUrl: "https://soundcloud.com/ericdoa/sad4whattt-from-euphoria-an"},
      {artistName: "Trippz Michaud", genre: "Emo", mediaUrl: "https://soundcloud.com/trippzmichaud/ignite?si=4f1a6ccd105f4c8ab6d614c1ba3d371c&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "PMP", genre: "Hip-hop", mediaUrl: "https://soundcloud.com/hyprmode/pmp-dvps-acuerdate?si=4f1a6ccd105f4c8ab6d614c1ba3d371c&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Dabin", genre: "EDM", mediaUrl: "https://soundcloud.com/kaiwachi/dabin-x-kai-wachi-hollow-feat-lo-spirit?si=4f1a6ccd105f4c8ab6d614c1ba3d371c&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Kenny Beats", genre: "Hip-hop", mediaUrl: "https://www.youtube.com/watch?v=C_k1dZxrYuI"},
      {artistName: "Fred again...", genre: "House", mediaUrl: "https://soundcloud.com/fredagain/turn-on-the-lights-again-feat?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Slow Magic", genre: "Electronic", mediaUrl: "https://soundcloud.com/slowmagic/human-nature?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Whethan", genre: "EDM", mediaUrl: "https://soundcloud.com/whethan/savage?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Louis The Child", genre: "EDM", mediaUrl: "https://soundcloud.com/louisthechild/slowdownlove?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Biicla", genre: "EDM", mediaUrl: "https://soundcloud.com/biicla/avicii-silhouettes-biicla-remixfree-download?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Zed's Dead", genre: "EDM", mediaUrl: "https://soundcloud.com/zedsdead/imanu-empress-zeds-dead-remix?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Pauline Herr", genre: "EDM", mediaUrl: "https://soundcloud.com/alisonwonderland/alison-wonderland-pauline-herr?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "Rossy", genre: "EDM", mediaUrl: "https://soundcloud.com/rossykate/heavens-door?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "San Holo", genre: "EDM", mediaUrl: "https://soundcloud.com/sanholobeats/light?si=a7051682fd1d42d9b5bc5ec643cc49a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"},
      {artistName: "KOTA The Friend", genre: "Hip-Hop", mediaUrl: "https://soundcloud.com/kotathefriend/outside"}
    ]

    for (const singleArtistData of artistsData) {
        await Artist.query().insert(singleArtistData)
    }
  }
}

export default ArtistSeeder