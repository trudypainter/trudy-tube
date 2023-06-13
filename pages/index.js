import Image from "next/image";
import { Inter } from "@next/font/google";
import TubeHead from "../components/TubeHead";
import SpotifyBox from "../components/spotify/SpotifyBox";
import BioBox from "../components/BioBox";
import ArenaBox from "../components/ArenaBox";
import FindMe from "../components/FindMe";
import WeatherBox from "../components/WeatherBox";
import dynamic from "next/dynamic";

const RippleGradient = dynamic(() => import("../components/RippleGradient"), {
  ssr: false,
});
export default function Home() {
  return (
    <div className="w-full bg-transparent">
      <TubeHead />

      <main className=" laptop:py-32 phone:py-0 pb-96 ">
        <RippleGradient />
        <BioBox />
        <SpotifyBox />
        <FindMe />
        <ArenaBox />
        <WeatherBox />
      </main>
    </div>
  );
}
