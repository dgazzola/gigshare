import { Favorite, User, Gig } from "../../models/index.js"

class FavoriteSeeder {
  static async seed(){

    const dan = await User.query().findOne("email", "dan@gmail.com")
    const sonny = await User.query().findOne("email", "sonny@gmail.com")
    const kate = await User.query().findOne("email", "kate@gmail.com")
    const amanda = await User.query().findOne("email", "amanda@gmail.com")
    const john = await User.query().findOne("email", "john@gmail.com")

    const coachella = await Gig.query().findOne("name", "Coachella")
    const hardSummer = await Gig.query().findOne("name", "Hard Summer")

    await Favorite.query().insert({gigId: coachella.id, userId: dan.id})
    await Favorite.query().insert({gigId: hardSummer.id, userId: dan.id})
    await Favorite.query().insert({gigId: hardSummer.id, userId: sonny.id})
    await Favorite.query().insert({gigId: hardSummer.id, userId: kate.id})
    await Favorite.query().insert({gigId: hardSummer.id, userId: amanda.id})
    await Favorite.query().insert({gigId: hardSummer.id, userId: john.id})


    console.log("favorites seeded")

  }
}

export default FavoriteSeeder