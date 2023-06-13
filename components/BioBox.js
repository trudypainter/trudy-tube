import Image from "next/image";
import { useEffect, useState } from "react";

export default function BioBox() {
  const [visits, setVisits] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // add a visit to the database including the time and ip address
  useEffect(() => {
    const addVisit = async () => {
      const res = await fetch("/api/visit", {
        method: "GET",
      });
      const json = await res.json();
      console.log(json);
      setVisits(json.visitCount);
      setLoaded;
    };

    if (!loaded) {
      addVisit();
    }
  }, []);

  return (
    <div className="laptop:w-[800px] mb-16 phone:w-[calc(100vw-1rem)] mx-auto">
      <div className="border-2 bg-white text-sm border-black border-b-0 laptop:mx-0  px-4 py-2 w-fit ">
        About Me
      </div>
      <div className="border-2 bg-white border-black p-4 w-full  overflow-x-scroll ">
        <div className="laptop:flex  laptop:items-center phone:flex-col">
          <div className="phone:pb-4">
            <Image
              className="rounded-t-full phone:mx-auto"
              src="/me.png"
              width={200}
              height={200}
            />
          </div>
          <div className="laptop:ml-8">
            <div className="text-md text-black">Name: Trudy Painter </div>
            <div className="text-md text-black">Age: 21 </div>
            <div className="text-md text-black">Location: New York, NY </div>
            <div className="text-md text-black">Height: 5' 6" </div>
            <div className="text-md text-black">
              Favorite Activities: wandering, coding{" "}
            </div>
            <div className="text-md text-black">
              Water Bottle: Clear Nalgene with a bendy straw{" "}
            </div>
            <div className="text-md text-black"> Site Visits: {visits} </div>
            <div className="text-md text-black">
              Full Site:{" "}
              <a
                className="text-blue-600 text-underline"
                href="https://www.trudy.computer"
                target="_blank"
              >
                www.trudy.computer
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 bg-white text-sm border-black laptop:mx-0  border-t-0 px-4 py-2 w-fit float-right  hover:cursor-pointer">
        Leave Me a Message
      </div>
    </div>
  );
}
