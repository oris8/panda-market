"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/components/Button/Button";
import SortDropdown from "@/components/Dropdown/SortDropdown";
import Input from "@/components/Input/Input";
import Pagination from "@/components/Pagination";
import ItemCard from "@/components/Item/ItemCard";
import useDeviceSize from "@/hooks/useDeviceSize";
import usePagination from "@/hooks/usePagination";
import { ITEM_LIMIT } from "@/constants/pageLimit";
import { ITEM_SORT_OPTIONS, ItemSortOptionsKeys } from "@/types/SortOptions";

interface NormalItemListProps {
  className?: string;
  data: { totalCount: number; list: Item[] };
  keyword: string;
}

const NormalItemList = ({
  className = "",
  data,
  keyword,
}: NormalItemListProps) => {
  const { totalCount, list } = data;
  const deviceSize = useDeviceSize();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams ? searchParams : undefined);
  const order = params.get("order") as ItemSortOptionsKeys;

  const {
    currentPageNumber,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = usePagination(totalCount, ITEM_LIMIT[deviceSize]);

  const handleSearch = (query: string) => {
    router.replace(`/items?keyword=${query}`);
  };

  const handleOrder = (order: ItemSortOptionsKeys) => {
    router.replace(`/items?order=${order}`);
  };

  const slicedItems = list.slice(0, ITEM_LIMIT[deviceSize]);

  return (
    <>
      <div className="mb-16 grid grid-cols-itemsHeader gap-8 grid-areas-itemsHeader md:flex md:items-center">
        <h2 className="my-auto mr-auto shrink-0 text-20 font-bold text-cool-gray-800 grid-in-title">
          판매중인 상품
        </h2>
        <Input.Search
          placeholder="검색할 상품을 입력해주세요"
          defaultValue={keyword ? keyword : ""}
          onKeyDown={handleSearch}
          className="w-full grid-in-searchBar md:w-242"
        />
        <Button.Link
          className="ct--primary-button h-42 w-133 shrink-0 grid-in-addButton"
          href="/additem"
        >
          상품 등록하기
        </Button.Link>
        <SortDropdown
          order={order ? order : "recent"}
          onClick={handleOrder}
          options={ITEM_SORT_OPTIONS}
          className="mx-auto grid-in-sortOption md:m-0"
        />
      </div>

      <div className={`${className}`}>
        {list && list.length !== 0 ? (
          <>
            <div className="flex flex-wrap justify-between gap-4">
              {slicedItems.map((item: Item) => (
                <ItemCard
                  key={item.id}
                  data={item}
                  className={`w-[calc(50%-4px)] shrink-0 md:w-[calc(33.3%-12px)] xl:w-[calc(20%-19.2px)] `}
                />
              ))}
            </div>
            <Pagination
              className="py-40"
              currentPage={currentPageNumber}
              totalPages={totalPages}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              goToPage={goToPage}
            />
          </>
        ) : (
          <div className="flexcenter mt-88 flex-col py-16 text-20 font-medium text-gray-500">
            <Image
              src="/images/img_inquiry-empty.svg"
              alt="아무것도 없어요 u.u"
              width={140}
              height={140}
            />
            상품이 없어요
          </div>
        )}
      </div>
    </>
  );
};

export default NormalItemList;
