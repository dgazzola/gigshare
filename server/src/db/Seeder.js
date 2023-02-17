/* eslint-disable no-console */
import { connection } from "../boot.js"
import { Artist, Gig } from "../models/index.js"
import UserSeeder from "./seeders/UserSeeder.js"
import GigSeeder from "./seeders/GigSeeder.js"
import ArtistSeeder from "./seeders/ArtistSeeder.js"
import LineupSeeder from "./seeders/LineupSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding users")
    await UserSeeder.seed()

    console.log("seeding gigs")
    await GigSeeder.seed()

    console.log("seeding artists")
    await ArtistSeeder.seed()

    console.log("attempting to seed lineups")
    await LineupSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder