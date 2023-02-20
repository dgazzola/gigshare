import express from "express";
import passport from "passport";
import { Favorite, User } from "../../../models/index.js";
import { ValidationError } from "objection"

const userFavoritesRouter = new express.Router()

userFavoritesRouter.get("/", async (req, res) => {
  const userId = req.user.id
  try {
    const user = await User.query().findById(userId)
    user.favorites = await user.$relatedQuery("gigs")
    return res.status(200).json({ user })
  } catch(error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default userFavoritesRouter