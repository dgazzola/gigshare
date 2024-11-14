import express from "express"
import ArtistSerializer from "../../../serializers/ArtistSerializer.js"
import { Artist } from "../../../models/index.js"

const artistsRouter = new express.Router()


artistsRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const artists = await Artist.query().page(page - 1, limit);
    const serializedArtists = await Promise.all(
      artists.results.map(async (artist) => {
        return await ArtistSerializer.getSummary(artist);
      })
    );

    return res.status(200).json({
      artists: serializedArtists,
      total: artists.total,
      totalPages: Math.ceil(artists.total / limit),
      currentPage: page
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

artistsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(404).json({ error: "Artist not found" })
  }
  try {
    const deletedArtist = await Artist.query().deleteById(id)
    if (!deletedArtist) {
      return res.status(404).json({ error: "Artist not found" })
    }
    return res.status(200).json({ deletedArtist })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

artistsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(404).json({ error: "Artist not found" })
  }
  try {
    const artist = await Artist.query().findById(id)
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" })
    }
    const serializedArtist = await ArtistSerializer.getDetail(artist)
    return res.status(200).json({ artist: serializedArtist })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

artistsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ error: "Artist not found" });
  }
  try {
    const artist = await Artist.query().findById(id);
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }
    const updatedArtist = await Artist.query().patchAndFetchById(id, req.body);
    return res.status(200).json({ artist: updatedArtist });
  } catch (error) {
    console.error("Error in artist PATCH:", error);
    return res.status(500).json({ errors: error.message || "Internal Server Error" });
  }
});

export default artistsRouter