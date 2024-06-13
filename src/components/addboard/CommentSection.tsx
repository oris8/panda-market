"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CommentInput from "@/components/Comment/CommentInput";
import Comment from "@/components/Comment/Comment";
import CommentEmpty from "../Comment/CommentEmpty";
import Button from "@/components/Button/Button";
import BackIcon from "/public/images/ic_back.svg";
import useDataFetch from "@/hooks/useDataFetch";
import { useAuth } from "@/contexts/AuthProvider";
import { POST_COMMENT_LIMIT } from "@/constants/pageLimit";

const CommentSection = ({ initialData }: any) => {
  const { user } = useAuth();
  const [values, setValues] = useState(initialData);
  const { nextCursor, list } = values;
  const { axiosFetcher } = useDataFetch();
  const { id } = useParams();

  const fetchComments = async (cursor?: number) => {
    const options = {
      method: "GET",
      url: `/articles/${id}/comments?limit=${POST_COMMENT_LIMIT}${cursor ? `&cursor=${cursor}` : ""}`,
    };
    const res = await axiosFetcher(options);

    setValues((prev: { list: Comment[]; nextCursor: number }) => ({
      ...prev,
      list: [...prev.list, ...res.data.list],
      nextCursor: res.data.nextCursor,
    }));
  };

  const handleCommentAdded = (newComment: Comment) => {
    setValues((prev: { list: Comment[]; nextCursor: number }) => ({
      ...prev,
      list: [newComment, ...prev.list],
    }));
  };

  const handleCommentDeleted = (deletedComment: Comment) => {
    setValues((prev: { list: Comment[]; nextCursor: number }) => {
      const updatedList = prev.list.filter(
        (comment) => comment.id !== deletedComment.id,
      );

      return {
        ...prev,
        list: updatedList,
      };
    });
  };

  return (
    <>
      <CommentInput
        label="댓글 달기"
        placeholder="댓글을 입력해주세요"
        onCommentAdded={handleCommentAdded}
      />
      <div className="mt-24 flex flex-col gap-24 pb-120 ">
        {list.length > 0 ? (
          <>
            {list.map((comment: Comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isUserComment={(user && comment.writer.id === user.id) || false}
                onCommentDeleted={handleCommentDeleted}
              />
            ))}
            {nextCursor && (
              <Button
                className="h-42 w-88 rounded-8 border-1 border-gray-400 text-gray-600"
                onClick={() => fetchComments(nextCursor)}
              >
                .. 댓글 더보기
              </Button>
            )}
          </>
        ) : (
          <CommentEmpty />
        )}
        <Button.Link
          className="primary-rounded-button mx-auto mt-40 h-48 w-240 gap-10 text-18"
          href="/boards"
        >
          목록으로 돌아가기
          <BackIcon />
        </Button.Link>
      </div>
    </>
  );
};

export default CommentSection;
