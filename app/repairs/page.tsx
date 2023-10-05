import prisma from "@/prisma/client";
import RepairTable from "../components/RepairTable";

export default async function Repairs() {
  const data = await prisma.repair.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start pl-24 bg-slate-50">
        <RepairTable data={data} />
      </main>
    </>
  );
}
