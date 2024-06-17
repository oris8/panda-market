"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import useDataFetch from "@/hooks/useDataFetch";
import removeAllWhitespace from "@/lib/utils/removeAllWhitespace";

const DEFAULT_PLACEHOLDER =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

interface CommentAddFormProps {
  className?: string;
  label?: string;
  placeholder?: string;
  onCommentAdded?: (comment: Comment) => void;
}

const CommentAddForm = ({
  className,
  label = "Comment",
  placeholder = DEFAULT_PLACEHOLDER,
  onCommentAdded = () => {},
}: CommentAddFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isValidation, setIsValidation] = useState(false);
  const { isLoading, axiosFetcher } = useDataFetch();
  const prams = useParams<{ id: string }>();
  const id = prams?.id;
  const { user } = useAuth();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
    setIsValidation(!!removeAllWhitespace(e.target.value));
  };

  const handleAddComment: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (!user) return alert("로그인 후 이용해주세요");

    const options = {
      method: "POST",
      url: `articles/${id}/comments`,
      data: { content: inputValue.trim() },
    };
    const { data } = await axiosFetcher(options);
    setInputValue("");
    onCommentAdded(data as Comment);
  };

  return (
    <form
      className={`flex flex-col gap-16 ${className}`}
      onSubmit={handleAddComment}
    >
      <label className="text-16 font-semibold text-cool-gray-800">
        {label}
      </label>
      <Input.TextArea
        className="h-104 px-24 py-16"
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
      />
      <Button
        className="ct--primary-button ml-auto h-42 w-71 text-14"
        type="submit"
        disabled={!isValidation || isLoading}
      >
        {isLoading ? "등록 중..." : "등록"}
      </Button>
    </form>
  );
};

export default CommentAddForm;
