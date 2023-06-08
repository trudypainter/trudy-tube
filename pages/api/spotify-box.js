import axios, { all } from "axios";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // get all the songs from the database
  const songs = await prisma.song.findMany({
    orderBy: {
      playedAt: "desc",
    },
  });

  res.status(200).json(songs);
};
