"use client";

import { addComment } from "@/lib/actions";

export default function CommentForm({ id }: { id: string }) {
  return (
    <>
      <button
        className="btn btn-secondary"
        /* @ts-ignore */
        onClick={() => document.getElementById("my_modal_2")!.showModal()}
      >
        Notiz anlegen
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col">
          <form
            action={(event) => addComment(event, id)}
            className="bg-white rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group"
          >
            <label htmlFor="mb-5">Reparaturverlauf</label>
            <textarea
              name="comment"
              className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
              required
            />
            <button
              className="btn btn-primary mt-3 text-white group-invalid:pointer-events-none group-invalid:opacity-50"
              type="submit"
              /* @ts-ignore */
              onClick={() => document.getElementById("my_modal_2")!.close()}
            >
              Speichern
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
