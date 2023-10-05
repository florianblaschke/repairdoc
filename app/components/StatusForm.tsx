"use client";

import { setStatus } from "@/lib/actions";

export default function StatusForm({ id }: { id: string }) {
  return (
    <form action={(event) => setStatus(event, id)}>
      <select name="status" id="status">
        <option value="accepted">Accepted</option>
        <option value="progress">In Progress</option>
        <option value="revalidate">Await response from customer</option>
        <option value="complete">Complete</option>
      </select>
      <button className="btn btn-secondary" type="submit">
        Apply changes
      </button>
    </form>
  );
}
