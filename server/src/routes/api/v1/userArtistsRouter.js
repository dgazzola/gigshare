import express from "express";
import passport from "passport";
import { User, Artist } from "../../../models/index.js";
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";

const userArtistsRouter = new express.Router({ mergeParams: true })

userArtistsRouter.post("/", async (req, res) => {
  // const artistName = req.body.artistName
  // const genre = req.body.genre
  const body = cleanUserInput(req.body)
  const artistName = body?.artistName
  const genre = body?.genre
  const userId = req.user.id
  console.log("artist name", artistName)
  console.log("genre", genre)
  try {
    const newArtist = await Artist.query().insert({ artistName, genre, userId })
    return res.status(201).json({ artist:newArtist })
  } catch(error) {
    if (error instanceof ValidationError) {
      console.log(error.data)
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors: error })
  }

})

export default userArtistsRouter