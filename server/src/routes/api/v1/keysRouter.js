import express from "express"

const keysRouter = new express.Router()

keysRouter.get("/", async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API
    if (!apiKey) {
      return res.status(404).json({ error: "API Key not found" })
    }
    return res.status(200).json({ apiKey })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default keysRouter
