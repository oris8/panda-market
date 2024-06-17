import Button from "@/components/Button/Button";
import {
  BestPostList,
  NormalPostList,
} from "@/components/PageComponents/boards";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";
import { PostSortOptionsKeys } from "@/types/SortOptions";
import { BEST_POST_LIMIT, POST_LIMIT } from "@/constants/pageLimit";

const INITIAL_POST_PARAMS = {
  pageSize: POST_LIMIT,
  order: "recent" as PostSortOptionsKeys,
};
const INITIAL_BEST_POST_PARAMS = {
  pageSize: BEST_POST_LIMIT["large"],
  order: "like" as PostSortOptionsKeys,
};

interface BoardsProps {
  searchParams: {
    page?: number;
    keyword?: string;
    order?: PostSortOptionsKeys;
  };
}

const Boards = async ({ searchParams }: BoardsProps) => {
  const page = searchParams.page || 1;
  const keyword = searchParams.keyword || "";
  const order = searchParams.order || INITIAL_POST_PARAMS.order;

  const [articlesRes, bestArticlesRes] = await Promise.all([
    sendAxiosRequest({
      method: "GET",
      url: `/articles?page=${page}&pageSize=${INITIAL_POST_PARAMS.pageSize}&orderBy=${order}&keyword=${keyword}`,
    }),
    sendAxiosRequest({
      method: "GET",
      url: `/articles?pageSize=${INITIAL_BEST_POST_PARAMS.pageSize}&orderBy=${INITIAL_BEST_POST_PARAMS.order}`,
    }),
  ]);

  const articles = articlesRes.data;
  const bestList: Post[] = bestArticlesRes.data.list;

  return (
    <>
      <div className="text-20 font-bold text-cool-gray-800">베스트 게시글</div>
      <BestPostList data={bestList} className="mb-40 mt-16" />
      <div className="mb-16 flex items-center justify-between">
        <div className="text-20 font-bold text-cool-gray-800">게시글</div>
        <Button.Link className="ct--primary-button h-42 w-88" href="/addboard">
          글쓰기
        </Button.Link>
      </div>
      <NormalPostList data={articles} keyword={keyword} />
    </>
  );
};

export default Boards;
