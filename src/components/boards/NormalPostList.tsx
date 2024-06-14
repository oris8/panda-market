"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchInput from "@/components/Input/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import NormalPost from "@/components/boards/NormalPost";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import { POST_SORT_OPTIONS, PostSortOptionsKeys } from "@/types/SortOptions";
import { POST_LIMIT } from "@/constants/pageLimit";

interface NormalPostListProps {
  className?: string;
  data: { totalCount: number; list: Post[] };
  keyword: string;
}

const NormalPostList = ({
  className = "",
  data,
  keyword,
}: NormalPostListProps) => {
  const { totalCount, list } = data;
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams ? searchParams : undefined);
  const order = params.get("order") as PostSortOptionsKeys;

  const {
    currentPageNumber,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = usePagination(totalCount, POST_LIMIT);

  const handleSearch = (query: string) => {
    router.replace(`/boards?keyword=${query}`);
  };

  const handleOrder = (order: PostSortOptionsKeys) => {
    router.replace(`/boards?order=${order}`);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-8 md:gap-16">
        <SearchInput
          placeholder="검색할 게시글을 입력해주세요"
          defaultValue={keyword ? keyword : ""}
          onKeyDown={handleSearch}
        />
        <SortDropdown
          order={order ? order : "recent"}
          options={POST_SORT_OPTIONS}
          onClick={handleOrder}
        />
      </div>
      <div className={`flex h-auto min-h-480 flex-col ${className}`}>
        {list && list.length !== 0 ? (
          <>
            {list.map((post: Post) => (
              <NormalPost
                key={post.id}
                data={post}
                className="border-b border-gray-200"
              />
            ))}
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
            게시글이 없어요
          </div>
        )}
      </div>
    </>
  );
};

export default NormalPostList;
