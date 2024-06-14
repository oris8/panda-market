"use client";

import { useParams } from "next/navigation";
import CommentSection from "@/components/Comment/CommentSection";
import useDataFetch from "@/hooks/useDataFetch";
import { ITEM_COMMENT_LIMIT } from "@/constants/pageLimit";

const ItemCommentSection = ({
  initialData,
}: {
  initialData: { list: Comment[]; nextCursor: number };
}) => {
  const { axiosFetcher } = useDataFetch();
  const prams = useParams<{ id: string }>();
  const id = prams?.id;

  const fetchItemComments = async (cursor?: number) => {
    const options = {
      method: "GET",
      url: `/products/${id}/comments?limit=${ITEM_COMMENT_LIMIT}${cursor ? `&cursor=${cursor}` : ""}`,
    };
    const res = await axiosFetcher(options);
    return res;
  };

  return (
    <>
      <CommentSection
        initialData={initialData}
        dataFetcher={fetchItemComments}
        returnPath="/items"
      />
    </>
  );
};

export default ItemCommentSection;
