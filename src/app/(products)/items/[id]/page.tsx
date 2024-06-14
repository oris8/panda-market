import ItemDetailSection from "@/components/items/ItemDetailSection";
import ItemCommentSection from "@/components/items/ItemCommentSection";
import { APP_BASE_URL } from "@/constants/common";
import { ITEM_COMMENT_LIMIT } from "@/constants/pageLimit";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = encodeURIComponent(params.id);

  const [itemResponse, commentsResponse] = await Promise.all([
    fetch(`${APP_BASE_URL}/products/${id}`, { next: { revalidate: 3600 } }),
    fetch(
      `${APP_BASE_URL}/products/${id}/comments?limit=${ITEM_COMMENT_LIMIT}`,
      {
        cache: "no-cache",
      },
    ),
  ]);
  if (!itemResponse.ok || !commentsResponse.ok) {
    throw new Error("Failed to fetch data");
  }
  const itemData: Item = await itemResponse.json();
  const commentsData: { nextCursor: number; list: Comment[] } =
    await commentsResponse.json();

  return (
    <div className="h-auto p-24">
      <ItemDetailSection initialData={itemData} />
      <ItemCommentSection initialData={commentsData} />
    </div>
  );
};

export default Page;
