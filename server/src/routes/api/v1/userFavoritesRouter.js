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
  }
)

userFavoritesRouter.post("/", async (req, res) => {
  const userId = req.user.id;
  const { gigId } = req.body;

  try {
    await Favorite.query().insert({ userId, gigId });

    const user = await User.query().findById(userId).withGraphFetched("favoritedGigs");

    return res.status(200).json({ favorites: user.favoritedGigs });
  } catch (error) {
    console.error("Error adding favorite:", error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: "Internal Server Error" });
  }
});

userFavoritesRouter.delete("/", async (req, res) => {
  const userId = req.user.id;
  const { gigId } = req.body;

  if (!gigId) {
    return res.status(400).json({ error: "gigId is required" });
  }

  try {
    const favorite = await Favorite.query()
      .where({ userId, gigId })
      .first();

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    await Favorite.query().delete().where({ userId, gigId });

    const user = await User.query().findById(userId).withGraphFetched("favoritedGigs");

    return res.status(200).json({ favorites: user.favoritedGigs });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});





export default userFavoritesRouter