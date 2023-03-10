import express from "express"
import { Gig, User, Favorite, Lineup } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const gigsRouter = new express.Router()

gigsRouter.get("/", async (req, res) => {
  try {
    const gigs = await Gig.query()
    return res.status(200).json({ gigs:gigs })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.post("/", async (req, res) => {
  const body = cleanUserInput(req.body)
  try {
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
  try {
    const gig = await Gig.query().findById(id)
    gig.artists = await gig.$relatedQuery("artists")
    gig.favorited = await gig.$relatedQuery("users")
    gig.isUserFavorite=false
    for (let i=0; i<gig.favorited?.length; i++){
      if (gig.favorited[i].id === req.user?.id){
        gig.isUserFavorite=true
      }
    }
    return res.status(200).json({ gig })
  } catch(error) {
    console.log(error)
    return res.status(500).json({ errors:error })
  }
})

gigsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const gig = await Gig.query().findById(id).patch(req.body)
    return res.status(200).json({ gig })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const deletedGig = await Gig.query().deleteById(id)
    return res.status(200).json({ deletedGig })
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.delete("/:id/favorites", async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  const gig = await Gig.query().findById(id)
  const user = await User.query().findById(userId)

  try {
    const deletedFavorite = await Favorite.query()
    .select('userId', 'gigId')
    .where('gigId', `${gig.id}`)
    .where('userId', `${user.id}`)
    .delete()
    return res.status(200).json({deletedFavorite})
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.post("/:id/favorites", async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  const gig = await Gig.query().findById(id)
  const user = await User.query().findById(userId)

  try {
    const addedFavorite = await Favorite.query().insertAndFetch({userId:user.id, gigId:gig.id})
    return res.status(201).json({addedFavorite})
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})

gigsRouter.patch("/:id/lineups", async (req, res) => {
  const { gigId } = req.body
  const { artistId } = req.body

  try {
    const addedLineup = await Lineup.query().insertAndFetch({ gigId, artistId })
    const returnedGig = await Gig.query().findById(gigId)
    return res.status(201).json({returnedGig})
  } catch (error) {
    return res.status(500).json({errors: error})
  }
})


export default gigsRouter