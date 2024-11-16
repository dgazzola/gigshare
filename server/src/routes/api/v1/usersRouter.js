import express from "express";
import uploadImage from "../../../services/uploadImage.js";
import { User } from "../../../models/index.js";
import { ValidationError } from "objection";
import UserSerializer from "../../../serializers/UserSerializer.js";
import userArtistsRouter from "./userArtistsRouter.js";
import userFavoritesRouter from "./userFavoritesRouter.js";

const usersRouter = new express.Router();
usersRouter.use("/:id/register-as-artist", userArtistsRouter)
usersRouter.use("/:id/favorites", userFavoritesRouter)

usersRouter.patch("/:id", uploadImage, async (req, res) => {
  const { id } = req.params;
  const { location } = req.file;
  
  if (!location) {
    return res.status(400).json({ errors: "No file uploaded." });
  }

  try {
    const user = await User.query().findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.$query().patch({ ...user, profileImage: location });

    const serializedUser = await UserSerializer.getSummary(user);
    return res.status(200).json({ user: serializedUser });
  } catch (error) {
    console.error("Error in PATCH /users/:id", error);
    return res.status(500).json({ errors: error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const favoritePage = parseInt(req.query.favoritePage) || 1;
  const hostedPage = parseInt(req.query.hostedPage) || 1;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const user = await User.query().findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const serializedUser = await UserSerializer.getSummary(user, favoritePage, hostedPage, limit);
    return res.status(200).json({ user: serializedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: error });
  }
});

usersRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const profileImage = "https://gigshare-production.s3.us-east-1.amazonaws.com/default+image.jpg";
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username, profileImage });

    return req.login(persistedUser, (err) => {
      if (err) {
        console.error("Error during req.login:", err);
        return res.status(500).json({ errors: err });
      }
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;