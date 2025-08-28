'use client'

import Search from "@/components/Search";
import { type FormEvent } from "react";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    router.push('/search');
}

  return (
      <main className="relative min-h-screen w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/world.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h1 className="absolute top-1/20 left-1/20 text-white text-3xl sm:text-4xl font-bold">Xplore</h1>
          <div className="relative w-full max-w-[500px]">
            <Search page="index" submitForm={submitForm} />
          </div>
        </div>
      </main>
  );
}
