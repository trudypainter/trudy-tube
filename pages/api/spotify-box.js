import axios, { all } from "axios";
import prisma from "../../lib/prisma";

export default async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // get all the songs from the database
  // const songs = await prisma.song.findMany({
  //   orderBy: {
  //     playedAt: "desc",
  //   },
  // });

  // url param is the most recent date to get songs from
  // date:  2023-08-30T22:02:33.587Z
  const { date } = req.query;

  let songs;
  if (date) {
    // get all the songs from the database from the past 10 days after the date
    // make sure date is in the correct format
    const dateObj = new Date(date);
    if (dateObj.toString() === "Invalid Date") {
      res.status(400).end("Invalid date");
      return;
    }

    songs = await prisma.song.findMany({
      where: {
        playedAt: {
          gte: new Date(new Date(date).setDate(new Date(date).getDate() - 10)),
        },
      },
      orderBy: {
        playedAt: "desc",
      },
    });
  } else {
    // get all the songs from the database from the past 10 days
    songs = await prisma.song.findMany({
      where: {
        playedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 10)),
        },
      },
      orderBy: {
        playedAt: "desc",
      },
    });
  }

  console.log("songs length: ", songs.length);
  res.status(200).json(songs);
};
