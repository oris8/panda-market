"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const usePagination = (totalCount: number, limit: number) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageNumber = Number(searchParams?.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams ? searchParams : undefined);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const totalPages = Math.ceil(totalCount / limit);

  const goToNextPage = () => {
    router.replace(createPageURL(currentPageNumber + 1));
  };
  const goToPrevPage = () => {
    router.replace(createPageURL(currentPageNumber - 1));
  };
  const goToPage = (number: number) => {
    router.replace(createPageURL(number));
  };

  return {
    currentPageNumber,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  };
};

export default usePagination;
