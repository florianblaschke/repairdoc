import { createOrg } from "@/lib/actions";

export default function CreateOrgForm() {
  return (
    <form action={createOrg} className="group p-10">
      <div className="join">
        <label
          htmlFor="name"
          className="join-item label label-text border font-medium p-3"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="input join-item input-bordered"
          required
          placeholder="Neues Team"
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
