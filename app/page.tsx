import RepairCard from "./components/RepairCard";
import prisma from "@/prisma/client";

export interface RepairInfo {
  id: string;
  ticket: number;
  order: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function Home() {
  const data: RepairInfo[] = await prisma.repair.findMany({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      Show urgent repairs, alarms, dashboard, etc
      <ul>
        {data.map((entry: RepairInfo) => (
          <li className="mb-5" key={entry.id}>
            <RepairCard
              id={entry.id}
              ticket={entry.ticket}
              order={entry.order}
              firstName={entry.firstName}
              lastName={entry.lastName}
              createdAt={entry.createdAt}
              status={entry.status}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
