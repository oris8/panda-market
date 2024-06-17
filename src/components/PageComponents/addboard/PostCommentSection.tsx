"use client";

import { useParams } from "next/navigation";
import CommentSection from "@/components/Comment/CommentSection";
import useDataFetch from "@/hooks/useDataFetch";
import { POST_COMMENT_LIMIT } from "@/constants/pageLimit";

const PostCommentSection = ({
  initialData,
}: {
  initialData: CommentResponse;
}) => {
  const { axiosFetcher } = useDataFetch();
  const prams = useParams<{ id: string }>();
  const id = prams?.id;

  const fetchPostComments = async (cursor?: number) => {
    const options = {
      method: "GET",
      url: `/articles/${id}/comments?limit=${POST_COMMENT_LIMIT}${cursor ? `&cursor=${cursor}` : ""}`,
    };
    const { data } = await axiosFetcher(options);
    return data;
  };

  return (
    <>
      <CommentSection
        initialData={initialData}
        dataFetcher={fetchPostComments}
        returnPath="/boards"
      />
    </>
  );
};

export default PostCommentSection;
