import express from "express"

const keysRouter = new express.Router()

keysRouter.get("/", async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API
    return res.status(200).json({ apiKey })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

export default keysRouter