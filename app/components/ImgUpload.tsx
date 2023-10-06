"use client";

import { CldUploadWidget } from "next-cloudinary";
import { BaseSyntheticEvent } from "react";
import { CldUploadWidgetResults } from "next-cloudinary";

export default function ImgUpload({
  addImageToRepair,
  id,
}: {
  addImageToRepair: Function;
  id: string;
}) {
  return (
    <CldUploadWidget
      onUpload={(result: CldUploadWidgetResults) => {
        if (!result.event) return;
        addImageToRepair(result.info!.public_id, id);
      }}
      uploadPreset="pwfnq8ch"
    >
      {({ open }) => {
        function handleOnClick(e: BaseSyntheticEvent) {
          e.preventDefault();
          open();
        }
        return (
          <button className="btn btn-primary" onClick={handleOnClick}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
