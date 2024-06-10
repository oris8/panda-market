"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import useFormData from "@/hooks/useFormData";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";
import uploadImageAndGetUrl from "@/lib/utils/uploadImageAndGetUrl";
import { useAuth } from "@/contexts/AuthProvider";
import removeAllWhitespace from "@/lib/utils/removeAllWhitespace";
import { useEffect, useState } from "react";

interface PostRequestType {
  title: string;
  content: string;
  image: File | string;
}

const AddBoard = () => {
  const [isValidation, setIsValidation] = useState(false);
  const { user } = useAuth(true);
  const router = useRouter();
  const { formData, handleChange, handleImageChange } =
    useFormData<PostRequestType>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.image && typeof formData.image !== "string") {
      const imageUrl = await uploadImageAndGetUrl(formData.image);
      handleImageChange(imageUrl);
    }

    try {
      const response = await sendAxiosRequest({
        method: "POST",
        url: "/articles",
        data: formData,
      });
      const id = response.data.id;
      router.replace(`/addboard/${id}`);
    } catch (error) {
      alert(`Error adding post: ${error}`);
    }
  };

  useEffect(() => {
    const validateForm = () => {
      if (
        removeAllWhitespace(formData.title) &&
        removeAllWhitespace(formData.content)
      ) {
        setIsValidation(true);
      } else {
        setIsValidation(false);
      }
    };

    validateForm();
  }, [formData]);

  return (
    <div className="relative mb-100">
      <h1 className="py-36 text-20 font-bold">게시글 등록하기</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormGroup.Label htmlFor="title" className="font-bold">
            *제목
          </FormGroup.Label>
          <FormGroup.InputField
            label="title"
            placeholder="제목을 입력해주세요"
            className="my-16"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormGroup.Label htmlFor="content" className="font-bold">
            *내용
          </FormGroup.Label>
          <FormGroup.InputField.TextArea
            label="content"
            placeholder="내용을 입력해주세요"
            className="my-16 h-200 xl:h-282"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormGroup.Label htmlFor="image" className="font-bold">
            이미지
          </FormGroup.Label>
          <FormGroup.InputField.Image
            label="image"
            placeholder="이미지 등록"
            className="my-16 h-168 w-168 xl:h-282 xl:w-282"
            onChange={handleImageChange}
          />
        </FormGroup>

        <Button.Primary
          className="absolute right-0 top-0 my-36 h-42 w-74"
          type="submit"
          disabled={!isValidation}
        >
          등록
        </Button.Primary>
      </form>
    </div>
  );
};

export default AddBoard;
