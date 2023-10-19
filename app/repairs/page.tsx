import prisma from "@/prisma/client";
import RepairTable from "../components/RepairTable";
import { getAuthSession } from "../api/auth/[...nextauth]/route";

export default async function Repairs() {
  const session = await getAuthSession();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });
  const data = await prisma.org.findUnique({
    where: { name: user?.orgActive! },
    select: { repairs: true },
  });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start pl-24">
        <RepairTable data={data?.repairs!} />
      </main>
    </>
  );
}
