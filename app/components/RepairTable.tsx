import Link from "next/link";
import { RepairInfo } from "../dashboard/page";

export default function RepairTable({ data }: { data: RepairInfo[] }) {
  const translate: Record<string, string> = {
    accepted: "Angenommen",
    progress: "In Bearbeitung",
    revalidate: "Kunden kontaktieren",
    complete: "Abgeschlossen",
  };
  return (
    <div className="w-11/12 min-h-full overflow-x-auto bg-inherit">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>RMA</th>
            <th>Status</th>
            <th>Delivered</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i: number) => (
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
              <td>{entry.createdAt.toLocaleDateString("de-DE")}</td>
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
            <th>Delivered</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
