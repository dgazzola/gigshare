import express from "express"
import { Lineup } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const lineupsRouter = new express.Router()

lineupsRouter.post("/", async (req, res) => {
  const body = cleanUserInput(req.body)
  console.log(body)
  try {
    // const newPersistedGig = await Lineup.query().insertAndFetch(body)
    return res.status(201).json({ })
  } catch (error) {
    if (error instanceof ValidationError){
      return res.status(422).json({ errors:error.data })
    }
    return res.status(500).json({ errors:error })
  }
})



export default lineupsRouter