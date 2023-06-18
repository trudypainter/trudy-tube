import axios, { all } from "axios";
import prisma from "../../lib/prisma";

async function getAccessToken(refreshToken) {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  console.log("access_token", response.data.access_token);
  return response.data.access_token;
}

export default async (req, res) => {
  // get all the songs from the database
  const songs = await prisma.song.findMany({
    orderBy: {
      playedAt: "desc",
    },
  });
  console.log("✅ songs", songs.length);

  // get access token
  const accessToken = await getAccessToken(process.env.TRUDY_REFRESH_TOKEN);

  // update the songs with the audioPreviewUrl
  const updatedSongs = [];
  for (const song of songs) {
    console.log(
      "trying to get audioPreviewUrl for",
      song.songName,
      "...",
      song.spotifySongId
    );
    // get the audioPreviewUrl from the Spotify API
    const track = await axios.get(
      `https://api.spotify.com/v1/tracks/${song.spotifySongId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const audioPreviewUrl = track.data.preview_url;
    console.log("✅ audioPreviewUrl", audioPreviewUrl);

    // update the song in the database
    const updatedSong = await prisma.song.update({
      where: {
        id: song.id,
      },
      data: {
        audioPreviewUrl: audioPreviewUrl,
      },
    });
    console.log("✅ updatedSong", updatedSong.songName);

    updatedSongs.push(updatedSong);
  }

  res.status(200).json(updatedSongs);
};
