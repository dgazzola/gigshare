import express from "express"
import { Gig } from "../../../models/index.js"

const gigsRouter = new express.Router()

gigsRouter.get("/", async (req, res) => {
  console.log("TEST POINT")
  try {
    const gigs = await Gig.query()
    console.log(gigs)
    return res.status(200).json({ gigs:gigs })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const gig = await Gig.query().findById(id)
    return res.status(200).json({ gig:gig })
  } catch(error) {
    return res.status(500).json({ errors:error })
  }
})

export default gigsRouter