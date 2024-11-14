import Artist from "../models/index.js";
import User from "../models/index.js";
import { Gig, Favorite } from "../models/index.js";

class UserSerializer {
  static async getSummary(user, favoritePage = 1, hostedPage = 1, limit = 8) {
    const allowedAttributes = ["id", "email", "username", "createdAt", "profileImage"];
    const serializedUser = {};

    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute];
    }

    const relatedArtist = await user.$relatedQuery("artists"); // Use `.first()` to get a single artist
    serializedUser.artist = relatedArtist || null;


    const favoriteGigs = await user.$relatedQuery("favoritedGigs").page(favoritePage - 1, limit);
    serializedUser.favoriteGigs = favoriteGigs.results;
    serializedUser.favoriteGigsTotalPages = Math.ceil(favoriteGigs.total / limit);

    const hostedGigs = await user.$relatedQuery("hostedGigs").page(hostedPage - 1, limit);
    serializedUser.hostedGigs = hostedGigs.results;
    serializedUser.hostedGigsTotalPages = Math.ceil(hostedGigs.total / limit);

    return serializedUser;
  }
}

export default UserSerializer;