'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div className="h-[100vh] flex flex-col">
      <nav className="bg-primary px-10 flex justify-between items-center py-2">
        <div className="flex gap-16 items-center">
          <p className="text-yellow-500 text-3xl font-semibold">G7 Hospital</p>
          <Link href="./patients" className="font-semibold text-white">
            Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="./login" className="font-semibold text-white">
            Sign In
          </Link>
          <Link href="./" className="font-semibold text-white">
            Sign Up
          </Link>
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
        <Button onClick={() => {router.push('./patients/')}} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-1xl mt-8">Get Started</Button>
      </main>
    </div>
  );
}
