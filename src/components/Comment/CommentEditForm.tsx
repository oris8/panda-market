"use client";

import { useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";

const CommentEditForm = ({
  initialValue,
  onConfirm,
  onCancel,
}: {
  initialValue: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}) => {
  const [updatedComment, setUpdatedComment] = useState(initialValue);

  const handleChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    setUpdatedComment(e.target.value);
  };

  const handleConfirmButton = () => {
    onConfirm(updatedComment);
  };

  const handleCancelButton = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleConfirmButton} className="w-full">
      <Input.TextArea value={updatedComment} onChange={handleChangeComment} />
      <div className="absolute bottom-36 right-0 flex gap-8">
        <Button className="mr-16 h-42 w-42" onClick={handleCancelButton}>
          취소
        </Button>
        <Button className="ct--primary-button h-42 w-96" type="submit">
          수정하기
        </Button>
      </div>
    </form>
  );
};

export default CommentEditForm;
