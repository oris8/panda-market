"use client";

import { useEffect } from "react";
import Image from "next/image";
import BaseInput from "@/components/Input/BaseInput";
import DeleteButton from "@/components/DeleteButton";
import PlusIcon from "/public/images/ic_plus.svg";
import { useImageInput } from "@/hooks/useImageInput";

interface ImageInputProps {
  className?: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string | string[]) => void;
}

/**
 *
 * @param onChange - setter
 * @returns
 */
const ImageInput = ({
  className,
  label,
  placeholder,
  onChange,
}: ImageInputProps) => {
  const { images, previewImages, handleUploadFile, handleDeleteFile } =
    useImageInput();

  useEffect(() => {
    if (onChange && images?.length > 0) {
      onChange(images[0]);
      console.log(images, previewImages);
    }
  }, [images]);

  return (
    <div className={`flex min-h-168 min-w-168 gap-8 ${className}`}>
      <label
        htmlFor={label}
        className="flexcenter h-full min-h-168 w-full min-w-168 flex-col gap-12 rounded-12 bg-cool-gray-100 xl:h-282 xl:w-282"
      >
        <PlusIcon className="h-48 w-48" />
        <p className="text-400 text-16 text-cool-gray-400">{placeholder}</p>
        <BaseInput
          id={label}
          name={label}
          type="file"
          accept="image/*"
          onChange={handleUploadFile}
          className="hidden"
        />
      </label>
      {previewImages[0] && (
        <div className="relative h-full min-h-168 w-full min-w-168 rounded-12 xl:h-282 xl:w-282">
          <Image alt={previewImages[0]} src={previewImages[0]} fill />
          <DeleteButton
            onClick={() => handleDeleteFile(0)}
            className="absolute right-8 top-8 bg-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
