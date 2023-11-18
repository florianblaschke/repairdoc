import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-2xl p-5">
        Ohne ein Team gibt es hier nichts zu sehen!🥲
      </h1>
      <Link className="btn btn-primary" href={"/settings"}>
        Hier kannst du ein Team erstellen
      </Link>
    </main>
  );
}
