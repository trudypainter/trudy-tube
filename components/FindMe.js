import Image from "next/image";
import { useEffect, useState } from "react";

export default function FindMe() {
  return (
    <div>
      <div className="border-2 bg-white text-sm border-black border-b-0 px-4 py-2 w-fit ">
        Find Me On The Internet
      </div>
      <div className="border-2 bg-white border-black py-24 w-[800px] overflow-x-scroll ">
        <div className="relative  h-[500px] w-[500px] m-auto ">
          {/* SVG of a four quadrant graph with arrows on the axis */}
          <svg
            className="absolute top-0 left-0"
            width="100%"
            height="100%"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="250"
              y1="0"
              x2="250"
              y2="500"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="250"
              x2="500"
              y2="250"
              stroke="black"
              strokeWidth="2"
            />
          </svg>

          <a
            className=" absolute top-16 left-1/4 text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://www.are.na/trudy-painter"
          >
            Are.na
          </a>

          <a
            className="absolute top-[280px] left-[140px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://open.spotify.com/user/trudypaintet?si=ZlW6diDKSl61x9oKhit5BA"
          >
            Spotify
          </a>

          <a
            className="absolute top-[160px] left-[180px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://github.com/trudypainter"
          >
            Github
          </a>

          <a
            className="absolute left-16 bottom-[270px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://vsco.co/bionicpinkytoe/gallery"
          >
            VSCO
          </a>

          <a
            className="absolute right-[180px] bottom-[100px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://www.linkedin.com/in/trudy-painter/"
          >
            LinkedIn
          </a>

          <a
            className="absolute top-[200px] right-[100px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="TrudyPainter_Resume.pdf"
          >
            Resume
          </a>

          <div className="absolute left-[0px] bg-white px-2 top-[238px]">
            Personal
          </div>
          <div className="absolute right-[0px] bg-white px-2 top-[238px]">
            Professional
          </div>
          <div className="absolute w-full text-center bg-white py-2 top-[0px]">
            Essential
          </div>
          <div className="absolute w-full text-center bg-white py-2 bottom-[0px]">
            Peripheral
          </div>
        </div>
      </div>
      <div className="border-2 bg-white text-sm border-black border-t-0 px-4 py-2 w-fit float-right hover:cursor-pointer">
        Call Me
      </div>
    </div>
  );
}
