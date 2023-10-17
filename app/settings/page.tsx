import prisma from "@/prisma/client";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import CreateOrgForm from "../components/CreateOrgForm";
import { setOrgActive } from "@/lib/actions";

export default async function Settings() {
  const session = await getAuthSession();
  const orgs = await prisma.org.findMany({
    where: { admin: session?.user?.email! },
  });
  const active = await prisma.user.findFirst({
    where: { email: session?.user.email },
    select: { orgActive: true, employeeAt: true },
  });
  return (
    <main className="ml-24 min-h-screen">
      <div className="flex flex-row flex-wrap min-w-full min-h-screen gap-0">
        <section className="flex flex-col h-screen w-1/2 items-center">
          <h2 className="text-lg font-bold mt-5">Erstelle ein neues Team</h2>
          <CreateOrgForm />
          <div className="divider m-0 font-medium">Teams</div>
          <div className="w-full">
            <ul className="p-8">
              <span className="text-lg font-bold">Hier bin ich Admin</span>
              {orgs.map((entry) => (
                <li className="border rounded-md p-1 m-1 w-96" key={entry.id}>
                  <form
                    action={setOrgActive}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">{entry.name}</span>
                    <button
                      className="btn btn-secondary"
                      name="orgName"
                      value={entry.name}
                    >
                      {active?.orgActive === entry.name ? "Aktiv" : "Wechseln"}
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <ul className="p-8">
              <span className="text-lg font-bold">Hier bin ich Mitglied</span>
              {active?.employeeAt.length !== 0 ? (
                active?.employeeAt.map((entry) => (
                  <li className="border rounded-md p-1 m-1 w-96" key={entry.id}>
                    <form
                      action={setOrgActive}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm font-medium">{entry.name}</span>
                      <button
                        className="btn btn-secondary"
                        name="orgName"
                        value={entry.name}
                      >
                        {active?.orgActive === entry.name
                          ? "Aktiv"
                          : "Wechseln"}
                      </button>
                    </form>
                  </li>
                ))
              ) : (
                <>
                  <br />
                  <span className="text-sm font-medium">
                    Du bist kein Mitglied in einem anderen Team
                  </span>
                </>
              )}
            </ul>
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
