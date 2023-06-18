import { useState, useEffect, useRef } from "react";
import SongRow from "./SongRow";
import Image from "next/image";

export default function SpotifyChart({ songs }) {
  const [hours, setHours] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const audioRef = useRef(new Audio(""));

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

  // make empty list of hours to store the songs played at each hour
  // there could be multiple songs played at the same hour, or no songs played at a certain hour
  useEffect(() => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push([]);
    }

    // for every song, add it to the list of songs played at that hour
    for (const song of songs) {
      const playedAt = new Date(song.playedAt);
      // song must be adjusted to EST
      playedAt.setHours(playedAt.getHours() + 4);
      const hour = playedAt.getHours();
      hours[hour].push(song);
    }

    // for every hour, sort the songs by early to late
    for (const hour of hours) {
      hour.sort((a, b) => {
        return new Date(a.playedAt) - new Date(b.playedAt);
      });
    }

    console.log(hours);
    setHours(hours);
  }, []);

  // handle audio
  const enterNodeHanlder = (song) => {
    console.log("playing: ", song.audioPreviewUrl);
    setSelectedSong(song);
    audioRef.current = new Audio(song.audioPreviewUrl);
    audioRef.current.play();
  };

  const exitNodeHanlder = (song) => {
    audioRef.current.pause();
    console.log("there was an exit");
    setSelectedSong(null);
  };

  return (
    <>
      <div className="w-full text-sm">
        <div className="w-full text-center ">Time Played</div>
        <div className="w-full flex  justify-around">
          <div>8:00am</div>
          <div>12:00pm</div>
          <div>8:00pm</div>
        </div>
      </div>
      <div className=" flex justify-between w-full">
        {hours.map((hour) => {
          return (
            <div className="w-3 my-4 flex flex-col items-center justify-center space-y-1">
              {hour.map((song) => {
                return (
                  <div
                    onMouseEnter={() => enterNodeHanlder(song)}
                    onMouseLeave={() => exitNodeHanlder(song)}
                    onClick={() => {
                      window.open(song.songLink, "_blank");
                    }}
                    className="laptop:w-3 laptop:h-3 phone:w-2 phone:h-2 rounded-full bg-gray-600 hover:bg-black hover:cursor-pointer"
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      {selectedSong ? (
        <div className="laptop:visible phone:hidden flex h-16 items-center bg-slate-50 space-x-2 w-full p-2">
          <div className="">
            <Image
              width={32}
              height={32}
              src={selectedSong.songImageUrl}
            ></Image>
          </div>
          <div className="h-6 flex items-center ">
            {selectedSong.songName} by {selectedSong.artistName} at{" "}
            {formatPlayedAtTime(selectedSong.playedAt)}
          </div>
        </div>
      ) : (
        <div className=" laptop:visible phone:hidden h-16 bg-slate-50 w-full text-center flex items-center justify-center">
          <p>Hover to play song</p>
        </div>
      )}
    </>
  );
}
