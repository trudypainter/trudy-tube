import Image from "next/image";
import { Inter } from "@next/font/google";
import TubeHead from "../components/TubeHead";
import SpotifyBox from "../components/spotify/SpotifyBox";
import BioBox from "../components/BioBox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full bg-green-200">
      <TubeHead />

      <main className="flex-col flex justify-center items-center py-32">
        <BioBox />
        <SpotifyBox />

        <div className="mx-auto py-32">
          Thanks for scrolling to the end. I hope you laugh today.
        </div>
      </main>
    </div>
  );
}
