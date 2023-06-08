import SpotifyContent from "./SpotifyContent";

export default function SpotifyBox() {
  return (
    <div>
      <div className="border-2 bg-white text-sm border-black border-b-0 px-4 py-2 w-fit ">
        Spotify Listening History
      </div>
      <div className="border-2 bg-gray-100 border-black p-4 w-[800px] overflow-x-scroll ">
        <SpotifyContent />
      </div>
      <div className="border-2 bg-white text-sm border-black border-t-0 px-4 py-2 w-fit float-right hover:cursor-pointer">
        See All
      </div>
    </div>
  );
}
