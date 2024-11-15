import express from "express"
import GigSerializer from "../../../serializers/GigSerializer.js"
import { Gig, User, Favorite, Lineup } from "../../../models/index.js"
import { ValidationError } from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"

const gigsRouter = new express.Router()

gigsRouter.get("/search", async (req, res) => {
  const query = req.query.query || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const gigs = await Gig.query()
      .where("name", "ilike", `%${query}%`)
      .orWhere("city", "ilike", `%${query}%`)
      .page(page - 1, limit);

    const serializedGigs = await Promise.all(
      gigs.results.map(async (gig) => {
        return await GigSerializer.getDetail(gig);
      })
    );

    return res.status(200).json({
      gigs: serializedGigs,
      totalCount: gigs.total,
      totalPages: Math.ceil(gigs.total / limit),
      currentPage: page,
      message: gigs.results.length === 0 ? "Sorry, no gigs match your query!" : undefined
    });
  } catch (error) {
    console.error("Error in /search endpoint:", error);
    return res.status(500).json({ errors: error });
  }
});


gigsRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const gigs = await Gig.query()
      .page(page - 1, limit);
    const serializedGigs = await Promise.all(
      gigs.results.map(async (gig) => {
        return await GigSerializer.getDetail(gig);
      })
    );
    
    return res.status(200).json({
      gigs: serializedGigs,
      totalCount: gigs.total,
      totalPages: Math.ceil(gigs.total / limit),
      currentPage: page
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

gigsRouter.post("/", async (req, res) => {
  const body = cleanUserInput(req.body)
  try {
    const newPersistedGig = await Gig.query().insertAndFetch(body)
    return res.status(201).json({ gig: newPersistedGig })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

gigsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(404).json({ error: "Gig not found" })
  }
  try {
    const gig = await Gig.query().findById(id)
    if (!gig) {
      return res.status(404).json({ error: "Gig not found" })
    }
    const serializedGig = await GigSerializer.getDetail(gig)
    for (let i = 0; i < serializedGig.favorited?.length; i++) {
      if (serializedGig.favorited[i].id === req.user?.id) {
        serializedGig.isUserFavorite = true
      }
    }
    return res.status(200).json({ gig: serializedGig })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gigsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ error: "Gig not found" });
  }
  try {
    const updatedGig = await Gig.query().patchAndFetchById(id, req.body);
    if (!updatedGig) {
      return res.status(404).json({ error: "Gig not found" });
    }
    return res.status(200).json({ gig: updatedGig });
  } catch (error) {
    console.error("Error updating gig:", error);
    return res.status(500).json({ errors: error.message });
  }
});

gigsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(404).json({ error: "Gig not found" })
  }
  try {
    const deletedGig = await Gig.query().deleteById(id)
    if (!deletedGig) {
      return res.status(404).json({ error: "Gig not found" })
    }
    return res.status(200).json({ deletedGig })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gigsRouter.delete("/:id/favorites", async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  if (!id || !userId) {
    return res.status(404).json({ error: "Gig or user not found" })
  }

  try {
    const gig = await Gig.query().findById(id)
    if (!gig) {
      return res.status(404).json({ error: "Gig not found" })
    }

    const user = await User.query().findById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const deletedFavorite = await Favorite.query()
      .select("userId", "gigId")
      .where("gigId", id)
      .where("userId", userId)
      .delete()
    
    return res.status(200).json({ deletedFavorite })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gigsRouter.post("/:id/favorites", async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  if (!id || !userId) {
    return res.status(404).json({ error: "Gig or user not found" })
  }

  try {
    const gig = await Gig.query().findById(id)
    if (!gig) {
      return res.status(404).json({ error: "Gig not found" })
    }

    const user = await User.query().findById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const addedFavorite = await Favorite.query().insertAndFetch({ userId, gigId: gig.id })
    return res.status(201).json({ addedFavorite })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

gigsRouter.patch("/:id/lineups", async (req, res) => {
  const { gigId, artistId } = req.body
  if (!gigId || !artistId) {
    return res.status(404).json({ error: "Gig or artist not found" })
  }

  try {
    const gig = await Gig.query().findById(gigId)
    if (!gig) {
      return res.status(404).json({ error: "Gig not found" })
    }

    const addedLineup = await Lineup.query().insertAndFetch({ gigId, artistId })
    const returnedGig = await Gig.query().findById(gigId)
    return res.status(201).json({ returnedGig })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default gigsRouter