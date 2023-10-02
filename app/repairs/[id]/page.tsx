import prisma from "@/prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function RepairDetailPage({ params: { id } }: Props) {
  const data = await prisma.repair.findUnique({ where: { id } });
  if (!data) {
    notFound();
  }
  console.log(data);
  return (
    <main className="flex flex-col align-center min-h-screen p-24 mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-xl ml-20">
        <figure></figure>
        <div className="card-body">
          <h2 className="customer">{data.firstName + " " + data.lastName}</h2>
          <p>Came in at: {data.createdAt?.toDateString()} </p>
          <p>Ticket: {data.ticket} </p>
          <p>Status: In Repair</p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </main>
  );
}
