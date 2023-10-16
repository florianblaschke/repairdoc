"use client";

import { setStatus } from "@/lib/actions";

export default function StatusForm({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <form>
      <span className="font-bold mr-2">Status:</span>
      <select
        className="select select-bordered"
        onChange={(event) => setStatus(event.target.value, id)}
        name="status"
        id="status"
        defaultValue={status}
      >
        <option value="accepted">Eingegangen</option>
        <option value="progress">In Bearbeitung</option>
        <option value="revalidate">Kunden kontaktieren</option>
        <option value="complete">Abgeschlossen</option>
      </select>
    </form>
  );
}
