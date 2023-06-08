// File: pages/api/callback.js

import axios from "axios";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token } = response.data;

    console.log("access_token", access_token);
    console.log("refresh_token", refresh_token);

    // Save the tokens in your database. For example, with Prisma:
    // await prisma.user.update({
    //   where: { id: userId },
    //   data: { spotifyAccessToken: access_token, spotifyRefreshToken: refresh_token },
    // });

    // Redirect the user back to your app.
    res.redirect("/");
  } catch (error) {
    console.error("Failed to exchange code for access token:", error);
    res
      .status(500)
      .json({ error: "Failed to exchange code for access token." });
  }
};
