import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import { ValidationError } from "objection"
import UserSerializer from "../../../serializers/UserSerializer.js";
import userArtistsRouter from "./userArtistsRouter.js"

const usersRouter = new express.Router();

usersRouter.use("/:id/register-as-artist", userArtistsRouter)

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.query().findById(id)
    const serializedUser = await UserSerializer.getSummary(user)
    return res.status(200).json({ user: serializedUser })
  }catch(error) {
    console.error(error)
  }
})

usersRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, username });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
		if (error instanceof ValidationError) {
			return res.status(422).json({ errors: error.data })
		}
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
