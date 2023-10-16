"use client";

import { CldImage } from "next-cloudinary";

type Image = Record<string, string>;

export default function Gallery({ data }: { data: Image[] }) {
  return (
    <div className="carousel rounded-box">
      {data &&
        data.map((entry, i) => (
          <div
            key={i}
            onClick={() => document.getElementById("repairModal")!.showModal()}
          >
            <CldImage
              width="150"
              height="120"
              sizes="100vw"
              src={`${entry.path}`}
              alt="repairImage"
            />
          </div>
        ))}
      <dialog id="repairModal" className="modal flex items-center">
        <div className="carousel">
          {data.map((entry, i) => (
            <div
              key={entry.id}
              id={`slide${i}`}
              className="carousel-item relative w-full flex justify-center"
            >
              <CldImage
                width={550}
                height={0}
                sizes="100vw"
                src={`${entry.path}`}
                alt="repairImages"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${i - 1}`} className="btn btn-circle">
                  ❮
                </a>
                <a href={`#slide${i + 1}`} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

{
  /* <Link className="carousel-item" href={entry.path} key={entry.id}> */
}
{
  /* </Link> */
}
