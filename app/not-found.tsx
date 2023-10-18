import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl p-5">Hier gibts nix zu sehen!</h1>
      <Link href="/dashboard" className="btn btn-primary">
        Hier gehts lang!
      </Link>
    </div>
  );
}
