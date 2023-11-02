"use client";

import { useEffect, type Dispatch, type SetStateAction, useRef } from "react";

export default function SearchWindow({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center pb-6">
        <h3 className="font-bold text-lg p-5">
          Durchforste hier deine Aufträge
        </h3>
        <label className="label mt-0">Was suchst du?</label>
        <input
          className="input input-bordered p-2"
          type="text"
          ref={inputRef}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
    </>
  );
}
