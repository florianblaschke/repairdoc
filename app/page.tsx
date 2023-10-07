import RepairCard from "./components/RepairCard";
import prisma from "@/prisma/client";
import StatBar from "./components/StatBar";
import Todo from "./components/ToDo";

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
  const data: RepairInfo[] = await prisma.repair.findMany({});
  const todos: Tasks[] = await prisma.todo.findMany({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ml-32">
      <div className="box-border grid grid-cols-2 grid-rows-2 min-h-screen min-w-full max-h-full">
        <div className="row-span-2 box-border border-r-2">
          <ul className="box-border flex flex-col items-center p-2">
            {data.map((entry: RepairInfo) => (
              <li className="mb-5 box-border" key={entry.id}>
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
          <StatBar />
        </div>
        <Todo todo={todos} />
      </div>
    </main>
  );
}
