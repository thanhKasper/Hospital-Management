import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-[100vh] flex flex-col">
      <nav className="bg-primary px-10 flex justify-between items-center py-2">
        <div className="flex gap-16 items-center">
          <p className="text-yellow-500 text-3xl font-semibold">G7 Hospital</p>
          <a href="" className="font-semibold text-white">
            Dashboard
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a href="" className="font-semibold text-white">
            Sign In
          </a>
          <a href="" className="font-semibold text-white">
            Sign Up
          </a>
        </div>
      </nav>
      <main className="flex flex-col justify-center items-center grow bg-cover bg-[url('/homepage_img.png')]">
        <h1 className="text-white font-semibold w-3/4 text-center text-5xl">
          Manage Hospital Easily With Our Website
        </h1>
        <p className="text-white w-3/4 text-center text-base mt-6">
          Lorem ipsum dolor sit amet consectetur. Porttitor rhoncus placerat
          vivamus pellentesque maecenas natoque. Enim pellentesque et faucibus
          mauris.
        </p>
        <button className="bg-yellow-500 px-6 py-2 mt-9 font-semibold text-xl rounded-lg">Get Started</button>
      </main>
    </div>
  );
}
