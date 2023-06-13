import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArenaBox() {
  const [images, setImages] = useState([]);

  // add a visit to the database including the time and ip address
  useEffect(() => {
    //get the number of items in an Are.na channel
    const getChannelLength = async () => {
      const res = await axios({
        method: "get",
        url: `https://api.are.na/v2/channels/things-i-like-eruhck1o7r0`,
      });
      const json = await res.data;
      const length = json.length;
      return length;
    };

    const getChannelPage = async (page) => {
      const res = await axios({
        method: "get",
        url: `https://api.are.na/v2/channels/things-i-like-eruhck1o7r0`,
        params: {
          page: page,
          per: 50,
        },
      });
      const json = await res.data;
      const contents = json.contents;
      return contents;
    };

    const getEntireChannel = async () => {
      const length = await getChannelLength();
      const pages = Math.ceil(length / 50);
      let contents = [];

      for (let i = 1; i <= pages; i++) {
        const page = await getChannelPage(i);
        contents = contents.concat(page);
      }

      return contents;
    };

    const getImages = async () => {
      const contents = await getEntireChannel();
      const images = contents.filter((item) => item.class === "Image");

      // reverse images and only get the first 10
      const reversedImages = images.reverse();
      const firstSelectImage = reversedImages.slice(0, 20);
      setImages(firstSelectImage);
    };

    getImages();
  }, []);

  return (
    <div className="laptop:w-[1000px] mb-16 phone:w-[calc(100vw-1rem)] mx-auto">
      <div className="border-2 bg-white text-sm border-black border-b-0 px-4 py-2 w-fit ">
        things i like (from Are.na)
      </div>
      <div className="border-2 bg-white border-black p-4  overflow-x-scroll flex  items-center  space-x-8">
        <div className="w-72 text-center flex-shrink-0">
          Scroll → for some images I like...
        </div>
        {images.map((image) => (
          <img
            className="object-contain w-64 h-64"
            src={image.image.original.url}
          />
        ))}
        <div className="w-96 text-center flex-shrink-0">
          There are even more images on my Are.na channel!
        </div>
      </div>
      <div className="border-2 bg-white text-sm border-black border-t-0 px-4 py-2 w-fit float-right hover:cursor-pointer">
        Visit the Full Channel
      </div>
    </div>
  );
}
