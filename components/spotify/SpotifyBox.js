import SpotifyContent from "./SpotifyContent";

export default function SpotifyBox() {
  return (
    <div className="laptop:w-[1400px] phone:w-[calc(100vw-1rem)] mx-auto mb-16">
      <div className="border-2 bg-gray-100 border-black p-4 phone:mx-auto overflow-x-scroll ">
        <SpotifyContent />
      </div>
    </div>
  );
}
