"use client";

import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import EditDeleteDropdown from "@/components/Dropdown/EditDeleteDropdown";
import CommentEditForm from "@/components/Comment/CommentEditForm";
import WriterInfo from "@/components/WriterInfo/WriterInfo";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";
import { useModal } from "@/contexts/ModalProvider";

const updateComment = async (id: number, comment: string) => {
  const options = {
    method: "PATCH",
    url: `/comments/${id}`,
    data: {
      content: comment,
    },
  };
  const { data } = await sendAxiosRequest(options);
  return data;
};

const deleteComment = async (id: number) => {
  const options = {
    method: "DELETE",
    url: `/comments/${id}`,
  };
  const { data } = await sendAxiosRequest(options);
  return data;
};

interface CommentProps {
  comment: Comment;
  isUserComment: boolean;
  onCommentEdited?: (comment: Comment) => void;
  onCommentDeleted?: (comment: Comment) => void;
}

const Comment = ({
  comment,
  isUserComment,
  onCommentEdited = () => {},
  onCommentDeleted = () => {},
}: CommentProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { id, writer, content, createdAt } = comment;
  const { image, nickname } = writer;

  const { showModal, hideModal } = useModal();

  const handleDeleteComment = async () => {
    hideModal();
    const data = await deleteComment(id);
    onCommentDeleted(data as Comment);
  };

  const onConfirmEditForm = async (comment: string) => {
    const data = await updateComment(id, comment);
    onCommentEdited(data as Comment);
    setIsEditable(false);
  };

  const handleDeleteCommentButton = () => {
    showModal(
      <Modal
        contentText="삭제하시겠습니까?"
        onConfirm={handleDeleteComment}
        onCancel={hideModal}
        confirmText="확인"
        cancelText="취소"
      />,
    );
  };

  return (
    <div className="relative flex flex-col gap-24 border-b border-cool-gray-100 pb-24">
      <div className="flex">
        {isEditable ? (
          <CommentEditForm
            initialValue={content}
            onConfirm={onConfirmEditForm}
            onCancel={() => setIsEditable(false)}
          />
        ) : (
          <>
            <div className="text-400 whitespace-pre-wrap text-16 text-cool-gray-800">
              {content}
            </div>
            {isUserComment && (
              <EditDeleteDropdown
                onDelete={handleDeleteCommentButton}
                onEdit={() => setIsEditable(true)}
              />
            )}
          </>
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
