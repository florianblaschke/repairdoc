"use client";

import React from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_2")!.showModal()}
      >
        add comment
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
