"use client";

import { createToDo } from "@/lib/actions";
import { useRef } from "react";
import { Tasks } from "../page";
import { deleteToDo } from "@/lib/actions";

export default function Todo({ todo }: { todo: Tasks[] }) {
  const form = useRef<HTMLFormElement>(null);
  return (
    <div className="min-w-fit h-full">
      <div className="mt-10 flex justify-center">
        <form ref={form} className="-mt-10 group" action={createToDo}>
          <div className="join">
            <input
              className="input input-bordered join-item group"
              type="text"
              name="todo"
              id="todo"
              required
            />
            <button
              onClick={form.current?.reset()!}
              className="btn btn-secondary join-item group-invalid:pointer-events-none group-invalid:opacity-50"
              type="submit"
            >
              Auf die Liste
            </button>
          </div>
        </form>
      </div>
      <div className="h-96 mt-20 overflow-y-auto">
        <ul>
          {todo.map((task: Tasks) => (
            <li
              key={task.id}
              className="flex flex-row rounded p-2 relative justify-between items-center w-full my-4 shadow-sm"
            >
              <p className="absolute top-0 text-xs">
                {task.createdBy} am {task.createdAt.toDateString()}
              </p>
              {task.task}
              <form action={deleteToDo}>
                <button
                  name="todo"
                  value={task.id}
                  className="btn btn-circle self-center"
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
                    className="lucide lucide-check-circle-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
