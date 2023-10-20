"use client";

import { deleteOrg } from "@/lib/actions";

export default function DeleteOrg({
  user,
  orgName,
}: {
  user: string;
  orgName: string;
}) {
  return (
    <>
      <button
        className="btn btn-warning"
        /* @ts-ignore */
        onClick={() => document.getElementById(`${orgName}delete`).showModal()}
      >
        Löschen
      </button>
      <dialog id={`${orgName}delete`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {`Bist du sicher das du das Team "${orgName}" löschen möchtest?`}
          </h3>
          <p className="py-4">Alle Daten gehen hierbei verloren!</p>
          <form action={deleteOrg}>
            <input hidden readOnly name="user" value={user} />
            <input hidden readOnly name="orgName" value={orgName} />
            <button className="btn btn-warning">Löschen</button>
          </form>
          <button
            /* @ts-ignore */
            onClick={() => document.getElementById(`${orgName}delete`).close()}
            className="btn btn-accent"
          >
            Abbrechen
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
