"use client";

import Image from "next/image";
import rocket from "@/public/rocket.png";
import { RepairInfo } from "../dashboard/page";
import Link from "next/link";
import { translate } from "@/lib/helpers";

type PartialInfo = Partial<RepairInfo>;

export default function RepairCard({
  ticket,
  firstName,
  lastName,
  createdAt,
  id,
  status,
}: PartialInfo) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl min-w-full">
      <figure>
        <Image src={rocket} height={100} width={100} alt="Machine" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <span className="font-bold">Angenommen:</span>
        <p className="text-sm">{createdAt?.toLocaleDateString("de-DE")} </p>
        <span className="font-bold">Ticket:</span>
        <p className="text-sm">{ticket} </p>
        <span className="font-bold">Status:</span>
        <p className="text-sm">{translate[status!]}</p>
        <div className="card-actions justify-end mt-8">
          <Link href={`/repairs/${id}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
