import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SpotifyChart from "./SpotifyChart";
import SongRow from "./SongRow";

export default function SpotifyContent() {
  const [songsState, setSongs] = useState(null);
  const scrollRef = useRef(null);

  const handleScroll = (e) => {
    const target = e.target;

    // Check if user has scrolled all the way to the right
    if (target.scrollWidth - target.scrollLeft === target.clientWidth) {
      console.log("Scrolled to the end!");
      getMoreSongs();
    }
  };

  const getMoreSongs = async () => {
    console.log("getting more songs", songsState);
    // get the earliest playedAt date in songsState
    // songState is a list of {date: [songs]}
    let earliestPlayedAt = null;
    for (const date in songsState) {
      const songs = songsState[date];
      const playedAt = songs[songs.length - 1].playedAt;
      if (!earliestPlayedAt || playedAt < earliestPlayedAt) {
        earliestPlayedAt = playedAt;
      }
    }

    // encode earliestPlayedAt for url
    const encodedEarliestPlayedAt = encodeURIComponent(earliestPlayedAt);
    // format song endpoint to get songs from the earliestPlayedAt date
    let songEndpoint = `/api/spotify-box?date=${encodedEarliestPlayedAt}`;

    console.log("calling endpoint: ", songEndpoint);
    const res = await fetch(songEndpoint);
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

    // songsByDate needs to be merged with songsState
    // songsByDate is the new songs
    // songsState is the old songs
    // merge the two together
    const mergedSongs = {};
    for (const date in songsByDate) {
      if (!mergedSongs[date]) {
        mergedSongs[date] = [];
      }
      mergedSongs[date].push(...songsByDate[date]);
    }
    for (const date in songsState) {
      if (!mergedSongs[date]) {
        mergedSongs[date] = [];
      }
      mergedSongs[date].push(...songsState[date]);
    }

    setSongs(mergedSongs);
  };

  // get all songs from the database
  // make a list of lists by date
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("/api/spotify-box");
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

  return (
    <div
      onScroll={handleScroll}
      className="flex w-screen overflow-x-scroll px-16"
    >
      {songsState &&
        Object.keys(songsState).map((date) => {
          return (
            <div className="flex flex-col mr-4 h-fit">
              <div className="text-sm text-black w-fit  bg-white p-2 border-2 border-b-0 border-black">
                {formatPlayedDate(date)}
              </div>
              <div className="flex flex-col h-[calc(100vh-90px)]">
                <div className="text-sm  flex flex-wrap bg-white items-center p-2 border-2 border-b-0 border-black">
                  <SpotifyChart songs={songsState[date]} />
                </div>
                <div className="border-2 border-black flex-grow-0 overflow-y-scroll bg-white">
                  {songsState[date].map((song) => {
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
