import NormalItemList from "@/components/items/NormalItemList";
import BestItemList from "@/components/items/BestItemList";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";
import { ItemSortOptionsKeys } from "@/types/SortOptions";
import { BEST_ITEM_LIMIT, ITEM_LIMIT } from "@/constants/pageLimit";

const INITIAL_ITEM_PARAMS = {
  pageSize: ITEM_LIMIT["large"],
  order: "recent" as ItemSortOptionsKeys,
};
const INITIAL_BEST_ITEM_PARAMS = {
  pageSize: BEST_ITEM_LIMIT["large"],
  order: "favorite" as ItemSortOptionsKeys,
};

interface ItemsProps {
  searchParams: {
    page?: number;
    keyword?: string;
    order?: ItemSortOptionsKeys;
  };
}

const Items = async ({ searchParams }: ItemsProps) => {
  const page = searchParams.page || 1;
  const keyword = searchParams.keyword || "";
  const order = searchParams.order || INITIAL_ITEM_PARAMS.order;

  const [itemsRes, bestItemsRes] = await Promise.all([
    sendAxiosRequest({
      method: "GET",
      url: `/products?page=${page}&pageSize=${INITIAL_ITEM_PARAMS.pageSize}&orderBy=${order}&keyword=${keyword}`,
    }),
    sendAxiosRequest({
      method: "GET",
      url: `/products?pageSize=${INITIAL_BEST_ITEM_PARAMS.pageSize}&orderBy=${INITIAL_BEST_ITEM_PARAMS.order}`,
    }),
  ]);

  const items = itemsRes.data;
  const bestItems: Item[] = bestItemsRes.data.list;

  return (
    <>
      <BestItemList data={bestItems} className="mb-40 mt-100" />
      <NormalItemList data={items} keyword={keyword} />
    </>
  );
};

export default Items;
