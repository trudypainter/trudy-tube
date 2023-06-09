import Image from "next/image";
import { Inter } from "@next/font/google";
import TubeHead from "../components/TubeHead";
import SpotifyBox from "../components/spotify/SpotifyBox";
import BioBox from "../components/BioBox";
import ArenaBox from "../components/ArenaBox";
import FindMe from "../components/FindMe";
import WeatherBox from "../components/WeatherBox";

export default function Home() {
  return (
    <div className="w-full bg-green-200">
      <TubeHead />

      <main className="flex-col flex justify-center items-center py-32 pb-96 space-y-16">
        <BioBox />
        <SpotifyBox />
        <FindMe />
        <ArenaBox />
        <WeatherBox />
      </main>
    </div>
  );
}
