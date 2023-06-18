import Image from "next/image";
export default function SongRow({ song }) {
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

  return (
    <>
      {song ? (
        <div className="flex flex-row m-0 space-x-1 bg-white p-2">
          <div className="flex  items-center w-12">
            <Image src={song.songImageUrl} width={48} height={48} />
          </div>
          <div className="flex flex-col space-y-0 w-48">
            <a
              className="text-sm text-black truncate hover:underline"
              href={song.songLink}
              target={"_blank"}
            >
              {song.songName}
            </a>
            <a
              className="text-sm text-black truncate hover:underline"
              href={song.artistLink}
              target={"_blank"}
            >
              {song.artistName}
            </a>
            <a
              className="text-sm text-black truncate hover:underline"
              href={song.albumLink}
              target={"_blank"}
            >
              {song.albumName}
            </a>
            <div className="laptop:hidden phone:visible text-sm text-black truncate ">
              Played at: {formatPlayedAtTime(song.playedAt)}
            </div>
          </div>
          <div className="flex flex-col space-y-0 w-48 phone:hidden laptop:visible items-start truncate">
            <a
              className="text-sm text-black truncate hover:underline"
              href={song.contextLink}
              target={"_blank"}
            >
              Context: {song.contextName}
            </a>
            {/* played at in the format of HH:MM */}
            <div className="text-sm text-black truncate ">
              Played at: {formatPlayedAtTime(song.playedAt)}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full  bg-red-50">hey</div>
      )}
    </>
  );
}
