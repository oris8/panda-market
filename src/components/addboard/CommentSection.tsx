"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import CommentInput from "@/components/Comment/CommentInput";
import Comment from "@/components/Comment/Comment";
import CommentEmpty from "../Comment/CommentEmpty";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button/Button";
import BackIcon from "/public/images/ic_back.svg";
import useDataFetch from "@/hooks/useDataFetch";
import { useAuth } from "@/contexts/AuthProvider";

const CommentSection = ({ initialData }: any) => {
  const { user } = useAuth();
  const [values, setValues] = useState(initialData);
  const { nextCursor, list } = values;
  const { axiosFetcher } = useDataFetch();
  // const { id } = useParams();

  // const goToNext = async () => {
  //   if (!nextCursor) return;
  //   const options = {
  //     method: "GET",
  //     url: `/articles/${id}/comments?limit=3`,
  //   };
  //   const res = await axiosFetcher(options);
  //   setValues(res);
  // };

  // const goToPrev = async () => {
  //   if (nextCursor - 6 < 0) return;
  //   const options = {
  //     method: "GET",
  //     url: `/articles/${id}/comments?limit=3&cursor=${nextCursor - 6}`,
  //   };
  //   const res = await axiosFetcher(options);
  //   setValues(res);
  // };

  return (
    <>
      <CommentInput label="댓글 달기" placeholder="댓글을 입력해주세요" />
      <div className="mb-160 mt-24 flex flex-col gap-24">
        {list.length > 0 ? (
          <>
            {list.map((comment: Comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isUserComment={(user && comment.writer.id === user.id) || false}
              />
            ))}
            {/* <Pagination goToPrevPage={goToPrev} goToNextPage={goToNext} /> */}
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
