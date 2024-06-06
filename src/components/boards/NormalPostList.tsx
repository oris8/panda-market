"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import SearchInput from "@/components/Input/SearchInput";
import SortDropdown from "@/components/SortDropdown";
import NormalPost from "@/components/boards/NormalPost";
import Pagination from "@/components/Pagination";
import { SortOptionsKeys } from "@/types/SortOptions";
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
  const router = useRouter();
  const { totalCount, list } = data;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageNumber = Number(searchParams.get("page")) || 1;

  const params = new URLSearchParams(searchParams);
  const order = params.get("order") as SortOptionsKeys;

  const handleSearch = (query: string) => {
    router.replace(`/boards?keyword=${query}`);
  };

  const handleOrder = (order: SortOptionsKeys) => {
    router.replace(`/boards?order=${order}`);
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const totalPages = Math.ceil(totalCount / POST_LIMIT);

  const goToNextPage = () => {
    router.replace(createPageURL(currentPageNumber + 1));
  };
  const goToPrevPage = () => {
    router.replace(createPageURL(currentPageNumber - 1));
  };
  const goToPage = (number: number) => {
    router.replace(createPageURL(number));
  };

  return (
    <>
      <div className="flex items-center justify-between gap-8 md:gap-16">
        <SearchInput
          placeholder="검색할 상품을 입력해주세요"
          defaultValue={keyword ? keyword : ""}
          onKeyDown={handleSearch}
        />
        <SortDropdown order={order ? order : "recent"} onClick={handleOrder} />
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
