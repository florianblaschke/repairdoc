import prisma from "@/prisma/client";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import CreateOrgForm from "../components/CreateOrgForm";

export default async function Settings() {
  const session = await getAuthSession();
  const orgs = await prisma.org.findMany({
    where: { admin: session?.user?.email! },
  });
  return (
    <main className="ml-20  h-screen text-center">
      <h1 className="py-2">Hallo {session?.user?.name}</h1>
      <div className="grid grid-cols-1 grid-rows-[1fr_30px_1fr] h-full">
        <section>
          Gründe eine Organisation!
          <CreateOrgForm email={session?.user?.email} />
        </section>
        <div className="divider"></div>
        <div>
          <h2>Meine Organisationen</h2>
          <ul>
            {orgs.map((entry) => (
              <li key={entry.id}>{entry.name}</li>
            ))}
          </ul>
        </div>
        <section>Jemanden in deine Organisation einladen</section>
      </div>
    </main>
  );
}
