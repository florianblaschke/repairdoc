import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-col items-center justify-evenly p-4 h-full fixed top-0 left-0 bg-yellow-300 w-1/12">
      <Link href={"/"}>Home</Link>
      <Link href={"/repairs"}>Repairs</Link>
      <Link href={"/"}>Search</Link>
    </div>
  );
}
