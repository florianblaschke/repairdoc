"use client";

import Image from "next/image";
import rocket from "@/public/rocket.png";
import { RepairInfo } from "../dashboard/page";
import Link from "next/link";

type PartialInfo = Partial<RepairInfo>;

export default function RepairCard({
  ticket,
  firstName,
  lastName,
  createdAt,
  id,
  status,
}: PartialInfo) {
  const translate: Record<string, string> = {
    accepted: "Accepted",
    progress: "In Progress",
    revalidate: "Contact customer",
    complete: "Complete",
  };
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image src={rocket} height={100} width={100} alt="Machine" />
      </figure>
      <div className="card-body">
        <h2 className="customer">{firstName + " " + lastName}</h2>
        <p>Angenommen: {createdAt?.toLocaleDateString("de-DE")} </p>
        <p>Ticket: {ticket} </p>
        <p>Status: {translate[status!]}</p>
        <div className="card-actions justify-end">
          <Link href={`/repairs/${id}`} className="btn btn-primary">
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
}
