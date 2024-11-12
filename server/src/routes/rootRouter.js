import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import gigsRouter from "./api/v1/gigsRouter.js";
import artistsRouter from "./api/v1/artistsRouter.js";
import keysRouter from "./api/v1/keysRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/gigs", gigsRouter);
rootRouter.use("/api/v1/getApiKey", keysRouter);
rootRouter.use("/api/v1/artists", artistsRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);

rootRouter.get("/api/v1/test", (req, res) => { // test endpoint
  res.json({ message: "Test route working" });
});



export default rootRouter;