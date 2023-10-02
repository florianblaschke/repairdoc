"use client";

import Image from "next/image";
import rocket from "@/public/rocket.png";
import { RepairInfo } from "../page";
import Link from "next/link";

type PartialInfo = Partial<RepairInfo>;

export default function RepairCard({
  ticket,
  order,
  firstName,
  lastName,
  createdAt,
  id,
}: PartialInfo) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image src={rocket} height={100} width={100} alt="Machine" />
      </figure>
      <div className="card-body">
        <h2 className="customer">{firstName + " " + lastName}</h2>
        <p>Came in at: {createdAt?.toDateString()} </p>
        <p>Ticket: {ticket} </p>
        <p>Status: In Repair</p>
        <div className="card-actions justify-end">
          <Link href={`/repairs/${id}`} className="btn btn-primary">
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
}
