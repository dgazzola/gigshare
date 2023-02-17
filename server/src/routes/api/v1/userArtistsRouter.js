import express from "express";
import passport from "passport";
import { User, Artist } from "../../../models/index.js";
import { ValidationError } from "objection"

const userArtistsRouter = new express.Router({ mergeParams: true })

userArtistsRouter.post("/", async (req, res) => {
  console.log("POST HIT")
  console.log("REQUEST BODY", req.body)
  const artistName = req.body.artistName
  const genre = req.body.genre
  const userId = req.user.id
  console.log("name:",artistName, "genre", genre, "userId:", userId)
  try {
    const newArtist = await Artist.query().insert({ artistName, genre, userId })
    return res.status(201).json({ artist:newArtist })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors: error })
  }

})

export default userArtistsRouter