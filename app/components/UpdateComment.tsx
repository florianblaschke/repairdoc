"use client";

import { updateComment } from "@/lib/actions";
import { useRef } from "react";

export default function UpdateComment({
  text,
  id,
}: {
  text: string;
  id: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <>
      <button
        className="btn btn-circle"
        /* @ts-ignore */
        onClick={() => document.getElementById("update_comment").showModal()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-pencil-line"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          <path d="m15 5 3 3" />
        </svg>
      </button>
      <dialog id="update_comment" className="modal">
        <div className="modal-box flex flex-col">
          <form
            onSubmit={formRef.current?.reset()!}
            ref={formRef}
            action={(event) => updateComment(event, id)}
            className="bg-white rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group"
          >
            <label htmlFor="mb-5">Reparaturverlauf</label>
            <textarea
              defaultValue={text}
              name="comment"
              className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
              required
            />
            <button
              className="btn btn-primary mt-3 text-white group-invalid:pointer-events-none group-invalid:opacity-50"
              type="submit"
              onClick={() => {
                /* @ts-ignore */
                document.getElementById("update_comment")!.close();
              }}
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
