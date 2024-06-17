"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BaseInput from "@/components/Input/BaseInput";
import DeleteButton from "@/components/Button/DeleteButton";
import PlusIcon from "/public/images/ic_plus.svg";

export const useMultiImageInput = (initialValue: File[] = []) => {
  const [images, setImages] = useState<File[]>([...initialValue]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const newImages: File[] = [];
    const newPreviewImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileURL = reader.result as string;
        newImages.push(files[i]);
        newPreviewImages.push(fileURL);

        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setPreviewImages((prevPreviews) => [
            ...prevPreviews,
            ...newPreviewImages,
          ]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index),
    );
  };

  return {
    images,
    previewImages,
    handleUploadFile,
    handleDeleteFile,
  };
};

interface ImageInputProps {
  className?: string;
  label: string;
  placeholder?: string;
  onChange?: (value: File[] | string[]) => void;
}

/**
 * @param onChange - setter
 */
const MultiImageInput = ({
  className,
  label,
  placeholder,
  onChange,
}: ImageInputProps) => {
  const { images, previewImages, handleUploadFile, handleDeleteFile } =
    useMultiImageInput();

  useEffect(() => {
    if (onChange) {
      onChange(images);
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
          multiple
          accept="image/*"
          onChange={handleUploadFile}
          className="hidden"
        />
      </label>
      {previewImages?.map((image, index) => (
        <div
          key={index}
          className="relative h-full min-h-168 w-full min-w-168 rounded-12 xl:h-282 xl:w-282"
        >
          <Image alt="Preview" src={image} fill />
          <DeleteButton
            onClick={() => handleDeleteFile(index)}
            className="absolute right-8 top-8 bg-transparent"
          />
        </div>
      ))}
    </div>
  );
};

export default MultiImageInput;
