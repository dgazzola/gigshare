import { Lineup, Artist, Gig } from "../../models/index.js"

class LineupSeeder {
  static async seed(){
    const zola = await Artist.query().findOne("artistName", "ZOLA")
    const porter = await Artist.query().findOne("artistName", "Porter Robinson")
    const skrillex = await Artist.query().findOne("artistName", "Skrillex")
    const gecs = await Artist.query().findOne("artistName", "100 Gecs")
    const xandor = await Artist.query().findOne("artistName", "Xandor")
    const protohype = await Artist.query().findOne("artistName", "Protohype")
    const formerHero = await Artist.query().findOne("artistName", "Former Hero")
    const hexCougar = await Artist.query().findOne("artistName", "Hex Cougar")
    const shadient = await Artist.query().findOne("artistName", "Shadient")
    const tisoki = await Artist.query().findOne("artistName", "Tisoki")
    const fluxPavilion = await Artist.query().findOne("artistName", "Flux Pavilion")
    const rlGrime = await Artist.query().findOne("artistName", "RL Grime")
    const oliverse = await Artist.query().findOne("artistName", "Oliverse")
    const slushii = await Artist.query().findOne("artistName", "Slushii")
    const ghastly = await Artist.query().findOne("artistName", "GHASTLY")
    const muraMasa = await Artist.query().findOne("artistName", "Mura Masa")
    const baynk = await Artist.query().findOne("artistName", "BAYNK")
    const fourb = await Artist.query().findOne("artistName", "4B")

    const midwxst = await Artist.query().findOne("artistName", "midwxst")
    const juiceWrld = await Artist.query().findOne("artistName", "Juice WRLD")
    const lilUziVert = await Artist.query().findOne("artistName", "Lil Uzi Vert")
    const kota = await Artist.query().findOne("artistName", "KOTA The Friend")
    const aidan = await Artist.query().findOne("artistName", "347 Aidan")
    const yungLean = await Artist.query().findOne("artistName", "Yung Lean")


    const coachella = await Gig.query().findOne("name", "Coachella")
    const hardSummer = await Gig.query().findOne("name", "Hard Summer")
    const edc = await Gig.query().findOne("name", "EDC Orlando")
    const electricForest = await Gig.query().findOne("name", "Electric Forest")
    const electricZoo = await Gig.query().findOne("name", "Electric Zoo")
    const decadence = await Gig.query().findOne("name", "Decadence")
    const campBisco = await Gig.query().findOne("name", "Camp Bisco")
    const grooveCruise = await Gig.query().findOne("name", "Groove Cruise")
    const lostLands = await Gig.query().findOne("name", "Lost Lands")
    const rollingLoud = await Gig.query().findOne("name", "Rolling Loud")

    await Lineup.query().insert({gigId: coachella.id, artistId: zola.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: porter.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: yungLean.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: tisoki.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: kota.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: ghastly.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: lilUziVert.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: aidan.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: fluxPavilion.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: gecs.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: midwxst.id})

    await Lineup.query().insert({gigId: campBisco.id, artistId: porter.id})
    await Lineup.query().insert({gigId: campBisco.id, artistId: shadient.id})
    await Lineup.query().insert({gigId: campBisco.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: campBisco.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: campBisco.id, artistId: zola.id})
    await Lineup.query().insert({gigId: campBisco.id, artistId: baynk.id})

    await Lineup.query().insert({gigId: grooveCruise.id, artistId: porter.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: fourb.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: tisoki.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: rlGrime.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: formerHero.id})
    await Lineup.query().insert({gigId: grooveCruise.id, artistId: fluxPavilion.id})

    await Lineup.query().insert({gigId: lostLands.id, artistId: fluxPavilion.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: slushii.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: rlGrime.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: shadient.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: formerHero.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: protohype.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: hexCougar.id})
    await Lineup.query().insert({gigId: lostLands.id, artistId: fourb.id})

    await Lineup.query().insert({gigId: rollingLoud.id, artistId: midwxst.id})
    await Lineup.query().insert({gigId: rollingLoud.id, artistId: kota.id})
    await Lineup.query().insert({gigId: rollingLoud.id, artistId: yungLean.id})
    await Lineup.query().insert({gigId: rollingLoud.id, artistId: lilUziVert.id})
    await Lineup.query().insert({gigId: rollingLoud.id, artistId: juiceWrld.id})

    await Lineup.query().insert({gigId: edc.id, artistId: zola.id})
    await Lineup.query().insert({gigId: edc.id, artistId: porter.id})
    await Lineup.query().insert({gigId: edc.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: edc.id, artistId: tisoki.id})
    await Lineup.query().insert({gigId: edc.id, artistId: slushii.id})
    await Lineup.query().insert({gigId: edc.id, artistId: ghastly.id})
    await Lineup.query().insert({gigId: edc.id, artistId: skrillex.id})

    await Lineup.query().insert({gigId: electricForest.id, artistId: porter.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: zola.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: ghastly.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: hexCougar.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: shadient.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: rlGrime.id})

    await Lineup.query().insert({gigId: hardSummer.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: hardSummer.id, artistId: tisoki.id})
    await Lineup.query().insert({gigId: hardSummer.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: hardSummer.id, artistId: slushii.id})
    await Lineup.query().insert({gigId: hardSummer.id, artistId: ghastly.id})

    await Lineup.query().insert({gigId: electricZoo.id, artistId: porter.id})
    await Lineup.query().insert({gigId: electricZoo.id, artistId: protohype.id})
    await Lineup.query().insert({gigId: electricZoo.id, artistId: oliverse.id})
    await Lineup.query().insert({gigId: electricZoo.id, artistId: shadient.id})
    await Lineup.query().insert({gigId: electricZoo.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: edc.id, artistId: shadient.id})
    await Lineup.query().insert({gigId: edc.id, artistId: tisoki.id})
    await Lineup.query().insert({gigId: edc.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: edc.id, artistId: zola.id})
    await Lineup.query().insert({gigId: edc.id, artistId: fluxPavilion.id})
    await Lineup.query().insert({gigId: edc.id, artistId: formerHero.id})
    await Lineup.query().insert({gigId: edc.id, artistId: porter.id})
    await Lineup.query().insert({gigId: edc.id, artistId: gecs.id})

    await Lineup.query().insert({gigId: decadence.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: decadence.id, artistId: porter.id})
    await Lineup.query().insert({gigId: decadence.id, artistId: tisoki.id})
    await Lineup.query().insert({gigId: decadence.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: decadence.id, artistId: muraMasa.id})
    await Lineup.query().insert({gigId: decadence.id, artistId: oliverse.id})

    console.log("Lineups seeded")
  }
}

export default LineupSeeder
