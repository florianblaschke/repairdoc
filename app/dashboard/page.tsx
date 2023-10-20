import RepairCard from "../components/RepairCard";
import prisma from "@/prisma/client";
import StatBar from "../components/StatBar";
import Todo from "../components/ToDo";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

export interface RepairInfo {
  id: string;
  ticket: number;
  order: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}

export interface Tasks {
  id: string;
  createdBy?: string | null;
  task: string;
  createdAt: Date;
}

export default async function Home() {
  const session = await getAuthSession();
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });
  /* const orgData = await prisma.org.findFirst({
    where: { admin: user?.email! },
    include: { employees: true, repairs: true, tasks: true },
  }); */

  const orgData = await prisma.org.findMany({
    where: {
      OR: [
        { admin: user?.email! },
        { AND: { employeesId: { has: user?.id! } } },
      ],
    },
    include: { employees: true, tasks: true, repairs: true },
  });

  const activeOrg = orgData?.find((org) => org.name === user?.orgActive);

  const notCompleted = orgData
    ?.find((org) => org.name === user?.orgActive)
    ?.repairs.filter((repair) => repair.status !== "complete");

  if (!user || !user.orgActive || !notCompleted) return notFound();

  return (
    <main className="max-h-screen ml-20">
      <div className="ml-8 grid grid-cols-2 grid-rows-[300px_auto] min-h-screen max-h-full">
        <div className="row-span-2 box-border border-r-2 overflow-y-auto w-full">
          <ul className="flex flex-col items-center p-2">
            {notCompleted!.map((entry) => (
              <li className="mb-5 w-5/6" key={entry.id}>
                <RepairCard
                  id={entry.id}
                  ticket={entry.ticket}
                  firstName={entry.firstName}
                  lastName={entry.lastName}
                  createdAt={entry.createdAt}
                  status={entry.status}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center min-w-fit">
          <StatBar data={activeOrg?.repairs!} todo={activeOrg?.tasks!} />
          <div className="divider mt-20">To-Do-Liste</div>
        </div>
        <Todo todo={activeOrg?.tasks!} />
      </div>
    </main>
  );
}
