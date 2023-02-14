class UserSerializer {
  static async getSummary(user) {
    const allowedAttributes = ["id", "email", "username", "createdAt"]
    const serializedUser={}

    for (const attribute of allowedAttributes) {
      serializedUser[attribute] = user[attribute]
    }

    const relatedArtist = await user.$relatedQuery("artists")
    serializedUser.artist = relatedArtist
    return serializedUser
  }
}

export default UserSerializer