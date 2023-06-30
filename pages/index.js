import Image from "next/image";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import TubeHead from "../components/TubeHead";
import SpotifyBox from "../components/spotify/SpotifyBox";
import BioBox from "../components/BioBox";
import ArenaBox from "../components/ArenaBox";
import FindMe from "../components/FindMe";
import WeatherBox from "../components/WeatherBox";
import dynamic from "next/dynamic";
import SpotifyContent from "../components/spotify/SpotifyContent";

const RippleGradient = dynamic(() => import("../components/RippleGradient"), {
  ssr: false,
});
export default function Home() {
  const [modalOpen, setModalOpen] = useState(true);

  const noScrollBarStyles = {
    overflowX: "auto",
    msOverflowStyle: "none", // for IE and Edge
    scrollbarWidth: "none", // for Firefox
    WebkitOverflowScrolling: "touch", // for mobile webkit
    "&::-webkit-scrollbar": {
      display: "none", // for Chrome, Safari, and Opera
    },
  };

  return (
    <div className="w-full bg-transparent">
      <TubeHead />

      <main
        className="flex h-screen items-center bg-blue-100 p-16 overflow-x-scroll overflow-y-hidden"
        style={noScrollBarStyles}
      >
        <SpotifyContent />
      </main>

      {modalOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className=" max-w-[calc(100vw-30px)] bg-white  border-2 border-black backdrop-blur-md p-16">
            <div>
              Hi, I'm{" "}
              <a
                className="underline text-blue-600"
                href="https://www.trudy.computer"
                target="_blank"
              >
                Trudy
              </a>
              . This is a project to track all the songs I listen to.
            </div>

            <div className="mt-8 flex space-x-2 items-starts laptop:visible phone:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M3 0l18 15h-11.081l-6.919 9z" />
              </svg>
              <div>Hover to play songs, click to open in Spotify.</div>
            </div>

            <div className="mt-8 flex space-x-2 items-starts laptop:hidden phone:visible">
              <div>💻 This website is better on your computer!</div>
            </div>

            <div
              onClick={() => setModalOpen(false)}
              className="bg-yellow-300 border-dotted border-2 border-black hover:cursor-pointer hover:border-solid mt-12 rounded-full text-center w-48 mx-auto p-4"
            >
              Let's go
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
