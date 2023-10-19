import prisma from "@/prisma/client";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import AdminOrgList from "../components/AdminOrgList";
import CreateOrgForm from "../components/CreateOrgForm";
import MemberOrgList from "../components/MemberOrgList";

export default async function Settings() {
  const session = await getAuthSession();
  const adminAtOrgs = await prisma.org.findMany({
    where: { admin: session?.user?.email! },
    include: { employees: true },
  });

  const user = await prisma.user.findFirst({
    where: { email: session?.user.email },
    include: { employeeAt: true },
  });

  return (
    <main className="ml-24 min-h-screen">
      <div className="flex flex-row flex-wrap min-w-full min-h-screen gap-0">
        <section className="flex flex-col h-screen w-1/2 items-center">
          <h2 className="text-lg font-bold mt-5">Erstelle ein neues Team</h2>
          <CreateOrgForm />
          <div className="divider m-0 font-medium">Teams</div>
          <div className="w-full">
            <AdminOrgList
              user={user}
              adminAtOrgs={adminAtOrgs}
              text={"Hier bin ich Admin"}
            />
          </div>
          <div className="w-full">
            <MemberOrgList user={user} text={"Hier bin ich Mitglied"} />
          </div>
        </section>
        <div className="divider divider-horizontal"></div>
        <section className="flex flex-col">
          <h2 className="font-bold text-lg p-8">Einstellungen</h2>
        </section>
      </div>
    </main>
  );
}
