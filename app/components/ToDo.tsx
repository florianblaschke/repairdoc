"use client";

import { createToDo } from "@/lib/actions";
import { useRef } from "react";
import { Tasks } from "../page";
import { deleteToDo } from "@/lib/actions";

export default function Todo({ todo }: { todo: Tasks[] }) {
  const form = useRef<HTMLFormElement>(null);
  return (
    <div className="-mt-36 min-w-fit">
      <div className="divider">To-Do Liste</div>
      <div className="mt-10 flex justify-center">
        <form ref={form} className="join" action={createToDo}>
          <label className="join-item label border bg-white" htmlFor="todo">
            Neue Aufgabe
          </label>
          <input
            className="input input-bordered join-item group"
            type="text"
            name="todo"
            id="todo"
            required
          />
          <button
            onClick={form.current?.reset()}
            className="btn btn-secondary join-item"
            type="submit"
          >
            Auf die Liste
          </button>
        </form>
      </div>
      <ul>
        {todo.map((task: Tasks) => (
          <li
            key={task.id}
            className="flex flex-row rounded p-2 relative justify-between items-center w-full my-4 shadow-sm"
          >
            <p className="absolute top-0 text-xs">
              Florian am {task.createdAt.toDateString()}
            </p>
            {task.task}
            <form action={deleteToDo}>
              <button
                name="todo"
                value={task.id}
                className="btn btn-circle self-center"
              >
                X
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
