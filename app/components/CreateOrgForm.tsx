"use client";

import { createOrg } from "@/lib/actions";

export default function CreateOrgForm({
  email,
}: {
  email: string | null | undefined;
}) {
  return (
    <form action={(event) => createOrg(event, email!)} className="group">
      <div className="join">
        <label htmlFor="name" className="join-item label label-text border">
          Name deiner Organisation
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="input join-item input-bordered"
          required
        />
        <button
          className="group btn btn-secondary join-item group-invalid:pointer-events-none group-invalid:opacity-50"
          type="submit"
        >
          Anlegen
        </button>
      </div>
    </form>
  );
}
