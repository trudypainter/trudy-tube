// File: pages/api/spotify-login.js

export default (req, res) => {
  if (req.method === "GET") {
    const redirect_uri =
      process.env.REDIRECT_URI || "http://localhost:3000/api/callback";
    const scopes = "user-read-recently-played";
    const clientId = process.env.SPOTIFY_CLIENT_ID;

    res.redirect(
      "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        clientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(redirect_uri)
    );
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
