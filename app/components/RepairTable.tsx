"use client";

import { translate } from "@/lib/helpers";
import { Repair } from "@prisma/client";
import Link from "next/link";
import { Suspense, useState } from "react";
import SearchWindow from "./Search";

export default function RepairTable({ data }: { data: Repair[] }) {
  const [search, setSearch] = useState("");
  const searchedData = data.filter(
    (entry) =>
      entry.firstName.toLowerCase().includes(search.trim().toLowerCase()) ||
      entry.lastName.toLowerCase().includes(search.trim().toLowerCase()) ||
      entry.email.includes(search) ||
      entry.order.toString().includes(search) ||
      entry.ticket.toString().includes(search) ||
      entry.serial?.toString().includes(search) ||
      entry.model.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <>
      <SearchWindow setSearch={setSearch} />
      <Suspense>
        <div className="w-11/12 min-h-full overflow-x-auto bg-inherit">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>RMA</th>
                <th>Status</th>
                <th>Angenommen</th>
                <th>Abgeschlossen</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchedData.map((entry, i: number) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="font-bold">
                        {entry.firstName} {entry.lastName}
                      </div>
                    </div>
                  </td>
                  <td>{entry.ticket}</td>
                  <td>{translate[entry.status]}</td>
                  <td>{entry.createdAt.toLocaleDateString("de-DE")}</td>
                  <td>
                    {entry.status === "complete"
                      ? entry.updatedAt.toLocaleDateString("de-DE")
                      : ""}
                  </td>
                  <th>
                    <Link
                      href={`repairs/${entry.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>RMA</th>
                <th>Status</th>
                <th>Angenommen</th>
                <th>Abgeschlossen</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Suspense>
    </>
  );
}
