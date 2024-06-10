import PostSection from "@/components/addboard/PostSection";
import CommentSection from "@/components/addboard/CommentSection";
import { APP_BASE_URL } from "@/constants/common";
import { POST_COMMENT_LIMIT } from "@/constants/pageLimit";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = encodeURIComponent(params.id);

  const [postResponse, commentsResponse] = await Promise.all([
    fetch(`${APP_BASE_URL}/articles/${id}`, { next: { revalidate: 3600 } }),
    fetch(
      `${APP_BASE_URL}/articles/${id}/comments?limit=${POST_COMMENT_LIMIT}`,
      {
        cache: "no-cache",
      },
    ),
  ]);
  if (!postResponse.ok || !commentsResponse.ok) {
    throw new Error("Failed to fetch data");
  }
  const postData: Post = await postResponse.json();
  const commentsData: { nextCursor: number; list: Comment[] } =
    await commentsResponse.json();

  return (
    <div className="h-auto">
      <PostSection initialData={postData} />
      <CommentSection initialData={commentsData} />
    </div>
  );
};

export default Page;
