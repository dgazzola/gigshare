import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = ["/", "/user-sessions/new", "/users/new", "/users/:id", "/gigs", "/gigs/:id","/gigs/:id/favorites","/gigs/:id/lineups", "/gigs/new-gig-form", "/artists", "/artists/:id", "/users/:id/register-as-artist", "/users/:id/favorites"];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;