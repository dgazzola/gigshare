import express from "express"
import { Artist } from "../../../models/index.js"
import { ValidationError } from "objection"

const artistsRouter = new express.Router()

artistsRouter.get("/", async (req, res) => {
  try {
    const artists = await Artist.query()
    return res.status(200).json({ artists:artists })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

artistsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const deletedArtist = await Artist.query().findById(id).delete()
    console.log(deletedArtist)
    return res.status(200).json({ deletedArtist })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

artistsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const artist = await Artist.query().findById(id)
    return res.status(200).json({ artist })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

artistsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  console.log("PATCH HIT")
  console.log("REQUES BODY", req.body)
  try {
    const artist = await Artist.query().findById(id).patch(req.body)
    return res.status(200).json({ artist })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})




export default artistsRouter