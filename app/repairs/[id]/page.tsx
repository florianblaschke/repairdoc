import StatusForm from "@/app/components/StatusForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function RepairDetailPage({ params: { id } }: Props) {
  const data = await prisma.repair.findUnique({ where: { id } });

  if (!data) return notFound();

  const translate: Record<string, string> = {
    accepted: "Accepted",
    progress: "In Progress",
    revalidate: "Contact customer",
    complete: "Complete",
  };

  return (
    <main className="flex flex-col align-center min-h-screen p-24 mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl ml-20">
        <figure></figure>
        <div className="card-body">
          <h2 className="customer">{data.firstName + " " + data.lastName}</h2>
          <p>Came in at: {data.createdAt?.toDateString()} </p>
          <p>Ticket: {data.ticket} </p>
          <p>Status: {translate[data.status]}</p>
          <StatusForm id={id} />
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </main>
  );
}
