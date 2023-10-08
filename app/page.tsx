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

  const notCompleted = data.filter((repair) => repair.status !== "complete");

  return (
    <main className="max-h-screen ml-20">
      <div className="box-border grid grid-cols-2 grid-rows-[300px_auto] min-h-screen min-w-full max-h-full">
        <div className="row-span-2 box-border border-r-2 overflow-y-auto">
          <ul className="box-border flex flex-col items-center p-2">
            {notCompleted.map((entry: RepairInfo) => (
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
          <StatBar data={data} todo={todos} />
          <div className="divider mt-20">To-Do-Liste</div>
        </div>
        <Todo todo={todos} />
      </div>
    </main>
  );
}
