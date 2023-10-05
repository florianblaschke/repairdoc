"use client";

import { addComment } from "@/lib/actions";

export default function CommentForm({ id }: { id: string }) {
  return (
    <form
      action={(event) => addComment(event, id)}
      className="bg-white rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group"
    >
      <label htmlFor="mb-5">
        Repair history
        <textarea
          name="comment"
          className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
        />
      </label>
      <button
        className="mt-5 bg-blue-500 py-3 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        type="submit"
        onClick={() => document.getElementById("my_modal_2")!.close()}
      >
        Comment
      </button>
    </form>
  );
}
