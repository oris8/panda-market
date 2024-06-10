import { useState } from "react";
import Image from "next/image";
import BaseDropdown from "@/components/BaseDropdown";
import getTimeAgo from "@/lib/utils/getTimeAgo";
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

      <UserProfile image={image} nickname={nickname} updatedAt={createdAt} />
    </div>
  );
};

interface UserProfileProps {
  image?: string;
  nickname?: string;
  updatedAt: Date;
}

const UserProfile = ({
  image,
  nickname = "똑똑한 판다",
  updatedAt,
}: UserProfileProps) => {
  const commentTimeAgo = getTimeAgo(updatedAt);

  return (
    <div className="flex items-center gap-8">
      <Image
        src={image || "/images/img_default-profile.svg"}
        alt={`${nickname}의 프로필 이미지`}
        width={40}
        height={40}
        className="h-40 w-40 rounded-[50%]"
      />
      <div>
        <span className="text-400 text-14 text-cool-gray-500">{nickname}</span>
        <div className="text-400 mt-4 text-12 text-cool-gray-400 ">
          {commentTimeAgo}
        </div>
      </div>
    </div>
  );
};

export default Comment;
