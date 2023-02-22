import express from "express";
import passport from "passport";
import { User, Artist } from "../../../models/index.js";
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";

const userArtistsRouter = new express.Router({ mergeParams: true })

userArtistsRouter.post("/", async (req, res) => {
  const body = cleanUserInput(req.body)
  const artistName = body?.artistName
  const mediaUrl = body?.mediaUrl
  const genre = body?.genre
  const userId = req.user.id
  try {
    const newArtist = await Artist.query().insert({ artistName, genre, userId, mediaUrl })
    return res.status(201).json({ artist:newArtist })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors: error })
  }

})

export default userArtistsRouter