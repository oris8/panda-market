"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BaseInput from "@/components/Input/BaseInput";
import DeleteButton from "@/components/DeleteButton";
import PlusIcon from "/public/images/ic_plus.svg";

export const useSingleImageInput = (initialValue: string = "") => {
  const [image, setImage] = useState<string>(initialValue);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const fileURL = reader.result as string;
      setImage(fileURL);
      setPreviewImage(fileURL);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteFile = () => {
    setImage("");
    setPreviewImage("");
  };

  return {
    image,
    previewImage,
    handleUploadFile,
    handleDeleteFile,
  };
};

interface ImageInputProps {
  className?: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string | string[]) => void;
}

/**
 * @param onChange - setter
 */
const ImageInput = ({
  className,
  label,
  placeholder,
  onChange,
}: ImageInputProps) => {
  const { image, previewImage, handleUploadFile, handleDeleteFile } =
    useSingleImageInput();

  useEffect(() => {
    if (onChange) {
      onChange(image);
    }
  }, [image, onChange]);

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
      {previewImage && (
        <div className="relative h-full min-h-168 w-full min-w-168 rounded-12 xl:h-282 xl:w-282">
          <Image alt="Preview" src={previewImage} fill />
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
