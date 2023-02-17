import { Lineup, Artist, Gig } from "../../models/index.js"

class LineupSeeder {
  static async seed(){

    const zola = await Artist.query().findOne("artistName", "ZOLA")
    const porter = await Artist.query().findOne("artistName", "Porter Robinson")
    const skrillex = await Artist.query().findOne("artistName", "Skrillex")
    const gecs = await Artist.query().findOne("artistName", "100 Gecs")
    const xandor = await Artist.query().findOne("artistName", "Xandor")
    const midwxst = await Artist.query().findOne("artistName", "midwxst")
    const coachella = await Gig.query().findOne("name", "Coachella")
    const hardSummer = await Gig.query().findOne("name", "Hard Summer")
    const edc = await Gig.query().findOne("name", "EDC Orlando")
    const electricForest = await Gig.query().findOne("name", "Electric Forest")
    const electricZoo = await Gig.query().findOne("name", "Electric Zoo")
    const burningMan = await Gig.query().findOne("name", "Burning Man")

    await Lineup.query().insert({gigId: coachella.id, artistId: zola.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: xandor.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: porter.id})
    await Lineup.query().insert({gigId: edc.id, artistId: zola.id})
    await Lineup.query().insert({gigId: edc.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: porter.id})
    await Lineup.query().insert({gigId: electricForest.id, artistId: zola.id})
    await Lineup.query().insert({gigId: hardSummer.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: electricZoo.id, artistId: porter.id})
    await Lineup.query().insert({gigId: electricZoo.id, artistId: skrillex.id})
    await Lineup.query().insert({gigId: edc.id, artistId: porter.id})
    await Lineup.query().insert({gigId: burningMan.id, artistId: skrillex.id})

    await Lineup.query().insert({gigId: coachella.id, artistId: gecs.id})
    await Lineup.query().insert({gigId: coachella.id, artistId: midwxst.id})
    await Lineup.query().insert({gigId: edc.id, artistId: gecs.id})

    console.log("lineups seeded")

  }
}

export default LineupSeeder