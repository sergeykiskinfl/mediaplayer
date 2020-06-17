const { db } = require("./util/admin");

// Get all tracks from the base
exports.getAllTracks = async (req, res) => {
  try {
    let tracks = [];
    let data = await db
      .collection("poems")
      .orderBy("sortNumber")
      .get();
    data.forEach((doc) => {
      tracks.push({
        id: doc.id,
        title: doc.data().title,
        author: doc.data().author,
        uri: doc.data().uri,
        imageSource: doc.data().imageSource,
        duration: doc.data().duration,
        album: doc.data().album,
        durationText: doc.data().duration_text,
        durationInMilis: doc.data().durationInMilis
      });
    });

    return res.json(tracks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};
