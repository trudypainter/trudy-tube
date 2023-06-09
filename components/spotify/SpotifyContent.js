import { useEffect, useState } from "react";
import Image from "next/image";

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

  const formatPlayedAtTime = (playedAt) => {
    // return time in format of HH:MM
    const time = playedAt.split("T")[1].split(".")[0];
    const hours = parseInt(time.split(":")[0]);
    const minutes = parseInt(time.split(":")[1]);
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

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

    return `${dayOfWeek}, ${monthName} ${day}, ${year}`;
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
              <div className="flex flex-col h-[600px]">
                <div className="text-sm  flex flex-wrap bg-white items-center p-2 border-2 border-b-0 border-black">
                  <div className="mr-2">{songs[date].length} songs played </div>
                  {songs[date].map((song) => {
                    return (
                      <div className="w-3 my-1 h-3 rounded-full bg-gray-600 mr-1"></div>
                    );
                  })}
                </div>
                <div className="border-2 border-black flex-grow-0 overflow-y-scroll">
                  {songs[date].map((song) => {
                    return (
                      <div className="flex flex-row m-0 space-x-1 bg-white p-2 ">
                        <div>
                          <Image
                            src={song.songImageUrl}
                            width={48}
                            height={48}
                          />
                        </div>
                        <div className="flex flex-col space-y-0 w-48">
                          <a
                            className="text-sm text-black"
                            href={song.songLink}
                          >
                            {song.songName}
                          </a>
                          <a
                            className="text-sm text-black"
                            href={song.artistLink}
                          >
                            {song.artistName}
                          </a>
                          <a
                            className="text-sm text-black"
                            href={song.albumLink}
                          >
                            {song.albumName}
                          </a>
                        </div>
                        <div className="flex flex-col space-y-0 w-48">
                          <a
                            className="text-sm text-black"
                            href={song.contextLink}
                          >
                            Context: {song.contextName}
                          </a>
                          {/* played at in the format of HH:MM */}
                          <div className="text-sm text-black">
                            Played at: {formatPlayedAtTime(song.playedAt)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
