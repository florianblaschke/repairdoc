"use client";

import { deleteRepair } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function DeleteRepair({ id }: { id: string }) {
  const router = useRouter();
  return (
    <>
      <button
        className="btn btn-warning"
        /* @ts-ignore */
        onClick={() => document.getElementById("modal_delete").showModal()}
      >
        Auftrag löschen
      </button>
      <dialog id="modal_delete" className="modal">
        <div className="modal-box flex flex-col w-fit flex-wrap items-center gap-2">
          <h3 className="font-bold text-lg">
            Willst du diesen Auftrag wirklich löschen?
          </h3>
          <p>Diese Aktion kann nicht rückgängig gemacht werden!</p>
          <div className="p-2 flex justify-evenly gap-2 modal-action">
            <button
              /* @ts-ignore */
              onClick={() => document.getElementById("modal_delete").close()}
              className="btn btn-accent"
            >
              Abbrechen
            </button>
            <form action={deleteRepair}>
              <button
                onClick={() => router.back()}
                name="id"
                value={id}
                className="btn btn-warning"
              >
                Löschen
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
