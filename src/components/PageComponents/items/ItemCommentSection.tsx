"use client";

import { useParams } from "next/navigation";
import CommentSection from "@/components/Comment/CommentSection";
import useDataFetch from "@/hooks/useDataFetch";
import { ITEM_COMMENT_LIMIT } from "@/constants/pageLimit";

const ItemCommentSection = ({
  initialData,
}: {
  initialData: CommentResponse;
}) => {
  const { axiosFetcher } = useDataFetch();
  const prams = useParams<{ id: string }>();
  const id = prams?.id;

  const fetchItemComments = async (cursor?: number) => {
    const options = {
      method: "GET",
      url: `/products/${id}/comments?limit=${ITEM_COMMENT_LIMIT}${cursor ? `&cursor=${cursor}` : ""}`,
    };
    const { data } = await axiosFetcher(options);
    return data;
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
