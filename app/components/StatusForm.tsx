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
      <select
        className="select select-bordered"
        onChange={(event) => setStatus(event.target.value, id)}
        name="status"
        id="status"
        defaultValue={status}
      >
        <option value="accepted">Accepted</option>
        <option value="progress">In Progress</option>
        <option value="revalidate">Await response from customer</option>
        <option value="complete">Complete</option>
      </select>
    </form>
  );
}
