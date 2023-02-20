import { User } from "../../models/index.js"

class UserSeeder {

  static async seed() {
    const usersData = [
      {username:"dan", email:"dan@gmail.com", password:"dan"},
      {username:"sonny", email:"sonny@gmail.com", password:"sonny"},
      {username:"bill", email:"bill@gmail.com", password:"bill"},
      {username:"tim", email:"tim@gmail.com", password:"tim"},
      {username:"john", email:"john@gmail.com", password:"john"},
      {username:"kate", email:"kate@gmail.com", password:"kate"},
      {username:"amanda", email:"amanda@gmail.com", password:"amanda"}
    ]

    for (const singleUserData of usersData) {
        await User.query().insert(singleUserData)
    }

    console.log("users seeded")
  }
}

export default UserSeeder