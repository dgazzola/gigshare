import express from "express";
import passport from "passport";
import { User, Artist } from "../../../models/index.js";
import { ValidationError } from "objection"

const userArtistsRouter = new express.Router({ mergeParams: true })

userArtistsRouter.post("/", async (req, res) => {
  console.log("POST HIT")
  const { artistName, genre } = req.body
  const userId = req.user.id
  console.log("artistName:", artistName)
  console.log("genre:", genre)
  console.log("userId:", req.user.id)
  try {
    const newArtist = await Artist.query().insertAndFetch({ artistName, genre, userId })
    return res.status(201).json({ artist:newArtist })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors: error })
  }

})

export default userArtistsRouter