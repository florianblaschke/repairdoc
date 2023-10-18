"use client";

import { inviteMember } from "@/lib/actions";
import { User } from "@prisma/client";

export default function Members({
  orgName,
  members,
}: {
  orgName: string | null | undefined;
  members: User[];
}) {
  return (
    <>
      <button
        className="btn btn-neutral"
        /* @ts-ignore */
        onClick={() => document.getElementById(`${orgName}`).showModal()}
      >
        Mitglieder
      </button>
      <dialog id={`${orgName}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{`Mitglieder von ${orgName}`}</h3>
          <form
            className="join flex items-baseline justify-center"
            action={inviteMember}
          >
            <label className="mb-5 w-full join-item" htmlFor="ticket">
              <input
                className="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800"
                type="text"
                name="model"
                placeholder="example@web.de"
                required
              />
            </label>
            <button className="btn btn-secondary join-item h-auto">
              Einladen
            </button>
          </form>

          <ul>
            {members.map((entry) => (
              <li key={entry.id} className="border rounded-md p-1 m-1 w-full">
                <div className="flex justify-between items-center gap-2">
                  <form className="flex justify-between items-center gap-2 w-full">
                    <span className="text-sm font-medium flex-1">
                      {entry.name}
                    </span>
                    <button className="btn btn-circle" name="orgName">
                      X
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
