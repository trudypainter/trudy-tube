import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>trudy.tube</title>
        <meta name="description" content="Data noise generated by Trudy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-3xl h-screen flex-col flex justify-center items-center ">
        <div>i'm working on this right now</div>

        <a className="text-blue-600 pt-24" href="https://trudy.computer">
          www.trudy.computer
        </a>
      </main>
    </>
  );
}
