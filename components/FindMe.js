import Image from "next/image";
import { useEffect, useState } from "react";

export default function FindMe() {
  return (
    <div className="laptop:w-[800px] mb-16 phone:w-[calc(100vw-1rem)] mx-auto">
      <div className="border-2 bg-white text-sm border-black border-b-0 px-4 py-2 w-fit ">
        Find Me On The Internet
      </div>
      <div className="border-2 bg-white border-black py-24  overflow-x-scroll ">
        <div className="relative  laptop:h-[500px] laptop:w-[500px] phone:w-[250px] phone:h-[250px] m-auto ">
          {/* SVG of a four quadrant graph with arrows on the axis */}
          <svg
            className="absolute top-0 left-0 phone:hidden"
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
          <svg
            className="absolute top-0 left-0 phone:visible"
            width="100%"
            height="100%"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="125"
              y1="0"
              x2="125"
              y2="250"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="125"
              x2="250"
              y2="125"
              stroke="black"
              strokeWidth="2"
            />
          </svg>

          <a
            className=" absolute phone:top-[2px] phone:left-[22px] laptop:top-16 laptop:left-1/4 text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://www.are.na/trudy-painter"
          >
            Are.na
          </a>

          <a
            className="absolute phone:top-[138px] phone:right-[150px] laptop:top-[280px] laptop:left-[140px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://open.spotify.com/user/trudypaintet?si=ZlW6diDKSl61x9oKhit5BA"
          >
            Spotify
          </a>

          <a
            className="absolute phone:top-[50px] phone:right-[134px] laptop:top-[160px] laptop:left-[180px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://github.com/trudypainter"
          >
            Github
          </a>

          <a
            className="absolute phone:top-[100px] phone:left-[2px] laptop:left-16 laptop:bottom-[270px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://vsco.co/bionicpinkytoe/gallery"
          >
            VSCO
          </a>

          <a
            className="absolute phone:bottom laptop:right-[180px] laptop:bottom-[100px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="https://www.linkedin.com/in/trudy-painter/"
          >
            LinkedIn
          </a>

          <a
            className="absolute laptop:top-[200px] laptop:right-[100px] text-blue-600 hover:no-text-blue-600"
            target="blank"
            href="TrudyPainter_Resume.pdf"
          >
            Resume
          </a>

          <div className="absolute laptop:left-0 phone:right-[250px] bg-white px-2 laptop:top-[238px] phone:top-[112px]">
            Personal
          </div>
          <div className="absolute laptop:right-0 phone:left-[250px] bg-white px-2 laptop:top-[238px] phone:top-[112px]">
            Professional
          </div>
          <div className="absolute w-full text-center bg-white py-2 laptop:top-[0px] phone:bottom-[250px]">
            Essential
          </div>
          <div className="absolute w-full text-center bg-white py-2 laptop:bottom-[0px] phone:top-[250px]">
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
