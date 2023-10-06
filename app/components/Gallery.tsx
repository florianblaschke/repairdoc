"use client";

import { CldImage } from "next-cloudinary";

type Image = Record<string, string>;

export default function Gallery({ data }: { data: Image[] }) {
  return (
    <div>
      {data &&
        data.map((entry) => (
          <CldImage
            key={entry.id}
            width={200}
            height={150}
            sizes="100vw"
            src={`${entry.path}`}
            alt="repairImage"
          />
        ))}
    </div>
  );
}
