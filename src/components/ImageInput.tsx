"use client";

import { useState } from "react";
import Image from "next/image";
import BaseInput from "@/components/BaseInput";
import DeleteButton from "@/components/DeleteButton";
import PlusIcon from "/public/images/ic_plus.svg";

interface ImageInputProps {
  className?: string;
  placeholder?: string;
  value?: string | string[];
  onChange?: React.ChangeEventHandler;
}

const ImageInput = ({ className, placeholder, value }: ImageInputProps) => {
  const [previewImg, setPreviewImg] = useState("");

  const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    if (files) {
      let fileURL;
      const reader = new FileReader();
      reader.onload = () => {
        fileURL = reader.result as string;
        if (fileURL) {
          setPreviewImg(fileURL);
          value = [fileURL];
        }
      };

      files && reader.readAsDataURL(files[0]);
    }
  };

  const handleDeleteFile = () => {
    setPreviewImg("");
    value = [];
  };

  return (
    <div className={`flex min-h-168 min-w-168 gap-8  ${className}`}>
      <label
        htmlFor="itemImages"
        className="flexcenter h-full min-h-168 w-full min-w-168 flex-col gap-12 rounded-12 bg-cool-gray-100 xl:h-282 xl:w-282"
      >
        <PlusIcon className="h-48 w-48" />
        <p className="text-400 text-16 text-cool-gray-400">{placeholder}</p>
        <BaseInput
          id="itemImages"
          name="itemImages"
          type="file"
          accept="image/*"
          onChange={handleUploadFile}
          value={value}
          className="hidden"
        />
      </label>
      {previewImg && (
        <div className="relative h-full min-h-168 w-full min-w-168 rounded-12 xl:h-282 xl:w-282">
          <Image alt={previewImg} src={previewImg} fill />
          <DeleteButton
            onClick={handleDeleteFile}
            className="absolute right-8 top-8 bg-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
