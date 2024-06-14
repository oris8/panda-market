"use client";

import { useParams } from "next/navigation";
import CommentSection from "@/components/Comment/CommentSection";
import useDataFetch from "@/hooks/useDataFetch";
import { POST_COMMENT_LIMIT } from "@/constants/pageLimit";

const BoardCommentSection = ({
  initialData,
}: {
  initialData: { list: Comment[]; nextCursor: number };
}) => {
  const { axiosFetcher } = useDataFetch();
  const prams = useParams<{ id: string }>();
  const id = prams?.id;

  const fetchBoardComments = async (cursor?: number) => {
    const options = {
      method: "GET",
      url: `/articles/${id}/comments?limit=${POST_COMMENT_LIMIT}${cursor ? `&cursor=${cursor}` : ""}`,
    };
    const res = await axiosFetcher(options);
    return res;
  };

  return (
    <>
      <CommentSection
        initialData={initialData}
        dataFetcher={fetchBoardComments}
        returnPath="/boards"
      />
    </>
  );
};

export default BoardCommentSection;
