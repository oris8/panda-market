import { useState } from "react";
import BaseDropdown from "@/components/BaseDropdown";
import WriterInfo from "@/components/WriterInfo/WriterInfo";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";
import KebabIcon from "/public/images/ic_kebab.svg";

interface CommentProps {
  comment: Comment;
  isUserComment: boolean;
}

const Comment = ({ comment, isUserComment }: CommentProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { writer, content, createdAt } = comment;
  const { image, nickname } = writer;
  const id = comment.id;

  const handleDeleteButton = () => {
    const options = {
      method: "DELETE",
      url: `/comments/${id}`,
    };
    sendAxiosRequest(options);
  };

  const toggleEditable = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col gap-24 border-b border-cool-gray-100 pb-24">
      <div className="flex">
        <div className="text-400 whitespace-pre-wrap text-16 text-cool-gray-800">
          {content}
        </div>

        {isUserComment && (
          <BaseDropdown
            buttonContent={<KebabIcon />}
            className="ml-auto w-40 border-0"
          >
            <div className="rounded-12 border-1 border-gray-200 bg-white">
              <button
                onClick={toggleEditable}
                className="flex w-128 justify-center border-b border-gray-200 p-8 text-base font-normal first:rounded-t-12 last:rounded-b-12 last:border-0"
              >
                수정하기
              </button>
              <button
                onClick={handleDeleteButton}
                className="flex w-128 justify-center border-b border-gray-200 p-8 text-base font-normal first:rounded-t-12 last:rounded-b-12 last:border-0"
              >
                삭제
              </button>
            </div>
          </BaseDropdown>
        )}
      </div>

      <WriterInfo className="flex items-center gap-8">
        <WriterInfo.ProfileImage className="" size={40} src={image} />
        <div>
          <WriterInfo.Writer nickname={nickname} className="mr-8" />
          <WriterInfo.UpdatedAt createdAt={createdAt} className="ml-auto" />
        </div>
      </WriterInfo>
    </div>
  );
};

export default Comment;
