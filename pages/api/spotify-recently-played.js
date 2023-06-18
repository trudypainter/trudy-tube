// File: pages/api/recently-played.js

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

async function getRecentlyPlayedTracks(accessToken) {
  const response = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/recently-played",
    params: {
      limit: 50,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
}

// returns [context information for a given track, name of the album/playlist/artist]
async function getContextInformation(accessToken, type, contextUri) {
  if (type === "album") {
    const response = await axios({
      method: "get",
      url: `https://api.spotify.com/v1/albums/${contextUri.split(":")[2]}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return [response.data, response.data.name];
  } else if (type === "playlist") {
    const response = await axios({
      method: "get",
      url: `https://api.spotify.com/v1/playlists/${contextUri.split(":")[2]}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return [response.data, response.data.name];
  } else if (type === "artist") {
    const response = await axios({
      method: "get",
      url: `https://api.spotify.com/v1/artists/${contextUri.split(":")[2]}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return [response.data, response.data.name];
  } else {
    return null;
  }
}

async function getSongGenres(accessToken, songId) {
  const response = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/tracks/${songId}`,
    params: {
      limit: 50,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // get genres from the album of the song
  const albumGenres = response.data.album.genres;

  // get genres from the artist of the song
  const artistGenres = response.data.artists[0].genres;

  // combine the two arrays of genres - handle if either is undefined
  const songGenres = albumGenres
    ? artistGenres
      ? [...albumGenres, ...artistGenres]
      : albumGenres
    : artistGenres
    ? artistGenres
    : [];

  // remove duplicates
  const uniqueGenres = [...new Set(songGenres)];

  return uniqueGenres.join(", ");
}

async function makeSongData(track, accessToken) {
  let contextName = "";
  let contextLink = "";

  if (track.context) {
    let context = await getContextInformation(
      accessToken,
      track.context.type,
      track.context.uri
    );

    contextName = context[1];
    contextLink = context[0].external_urls.spotify;
  }

  const songGenresString = await getSongGenres(accessToken, track.track.id);

  const songData = {
    spotifySongId: track.track.id,
    songLink: track.track.external_urls.spotify,
    songName: track.track.name,
    songImageUrl: track.track.album.images[0].url,

    artistName: track.track.artists[0].name,
    artistLink: track.track.artists[0].external_urls.spotify,

    albumName: track.track.album.name,
    albumLink: track.track.album.external_urls.spotify,

    contextName: contextName,
    contextLink: contextLink,

    genres: songGenresString,
    playedAt: track.played_at,

    audioPreviewUrl: track.track.preview_url,
  };

  return songData;
}

export default async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const accessToken = await getAccessToken(process.env.TRUDY_REFRESH_TOKEN);
    const tracks = await getRecentlyPlayedTracks(accessToken);

    // get the most recently played song from the prisma database by the `playedAt` field
    const mostRecentDbSong = await prisma.song.findFirst({
      orderBy: {
        playedAt: "desc",
      },
    });

    // filter out songs that have already been added to the database
    const newTracks = tracks.filter((track) => {
      return new Date(track.played_at) > new Date(mostRecentDbSong.playedAt);
    });

    // // create Song records in the database
    console.log("✅ newTracks", newTracks.length);
    const allSongs = [];
    for (const track of newTracks) {
      console.log(track.track.name);
      const songData = await makeSongData(track, accessToken);
      await prisma.song.create({
        data: songData,
      });

      allSongs.push(songData);
    }

    res.json({
      response: `Success Adding ${allSongs.length} Songs`,
      songs: allSongs,
    });
  } catch (error) {
    console.error("Failed to get recently played tracks:", error);
    res
      .status(500)
      .json({ error: "Failed to get recently played tracks", msg: error });
  }
};
