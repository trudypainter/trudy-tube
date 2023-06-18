import { useEffect, useState } from "react";
import Image from "next/image";
import SpotifyChart from "./SpotifyChart";
import SongRow from "./SongRow";

export default function SpotifyContent() {
  const [songs, setSongs] = useState(null);

  // get all songs from the database
  // make a list of lists by date
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/spotify-box");
      const songs = await res.json();

      // subtract 4 hours from the time to get the time in EST
      for (const song of songs) {
        const playedAt = new Date(song.playedAt);
        playedAt.setHours(playedAt.getHours() - 4);
        song.playedAt = playedAt.toISOString();
      }

      // make a list of lists by date
      const songsByDate = {};
      for (const song of songs) {
        const date = song.playedAt.split("T")[0];
        if (!songsByDate[date]) {
          songsByDate[date] = [];
        }
        songsByDate[date].push(song);
      }

      // for every single day, sort the songs by early to late
      for (const date in songsByDate) {
        songsByDate[date].sort((a, b) => {
          return new Date(a.playedAt) - new Date(b.playedAt);
        });
      }

      setSongs(songsByDate);
    };
    fetchData();
  }, []);

  const formatPlayedDate = (playedAt) => {
    // return date in format of Day of the Week, Month Day, Year
    const date = playedAt.split("T")[0];
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    const monthName = new Date(`${year}-${month}-${day}`).toLocaleString(
      "default",
      { month: "long" }
    );
    const dayOfWeek = new Date(`${year}-${month}-${day}`).toLocaleString(
      "default",
      { weekday: "short" }
    );

    // get the day before playedAt
    const nextDay = new Date(playedAt);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayDayOfWeek = nextDay.toLocaleString("default", {
      weekday: "short",
    });

    return `${nextDayDayOfWeek}, ${monthName} ${day}, ${year}`;
  };

  const noScrollBarStyles = {
    overflowX: "scroll",
    msOverflowStyle: "none", // for IE and Edge
    scrollbarWidth: "none", // for Firefox
    WebkitOverflowScrolling: "touch", // for mobile webkit
    "&::-webkit-scrollbar": {
      display: "none", // for Chrome, Safari, and Opera
    },
  };

  return (
    <div className="flex ">
      {songs &&
        Object.keys(songs).map((date) => {
          return (
            <div className="flex flex-col mr-4 h-fit">
              <div className="text-sm text-black w-fit  bg-white p-2 border-2 border-b-0 border-black">
                {formatPlayedDate(date)}
              </div>
              <div className="flex flex-col h-[calc(100vh-90px)]">
                <div className="text-sm  flex flex-wrap bg-white items-center p-2 border-2 border-b-0 border-black">
                  <SpotifyChart songs={songs[date]} />
                </div>
                <div className="border-2 border-black flex-grow-0 overflow-y-scroll">
                  {songs[date].map((song) => {
                    return <SongRow song={song} />;
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
