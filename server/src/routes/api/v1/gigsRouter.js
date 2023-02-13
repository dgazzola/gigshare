import express from "express"
import { Gig } from "../../../models/index.js"
import { ValidationError } from "objection"

const gigsRouter = new express.Router()

gigsRouter.get("/", async (req, res) => {
  try {
    const gigs = await Gig.query()
    console.log(gigs)
    return res.status(200).json({ gigs:gigs })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const newPersistedGig = await Gig.query().insertAndFetch(body)
    return res.status(201).json({ gig:newPersistedGig })
  } catch (error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors:error })
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