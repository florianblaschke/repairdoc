"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen min-w-screen ml-20 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold p-5">
        Du musst erst ein Team gründen oder einem beitreten, damit dein
        Dashboard einsatzbereit ist!
      </h1>
      <Link href="/settings" className="btn btn-primary">
        Hier gehts lang!
      </Link>
    </main>
  );
}
