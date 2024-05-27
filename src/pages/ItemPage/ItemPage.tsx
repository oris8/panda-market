import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./ItemPage.style.js";
import { getItems } from "../../services/api.js";
import useWindowSize from "../../hooks/useWindowSize.js";
import usePagination from "../../hooks/usePagination.js";

const BEST_ITEMS_LIMIT = {
  small: 1,
  medium: 2,
  large: 4,
};

const ITEMS_LIMIT = {
  small: 4,
  medium: 6,
  large: 10,
};

function ItemPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [bestItems, setBestItems] = useState<Item[]>([]);
  const [order, setOrder] = useState<ItemSortOptionsType>("createdAt");
  const [searchValue, setSearchValue] = useState("");
  const { width = window.innerWidth } = useWindowSize();
  const [screenSize, setScreenSize] = useState<DeviceSize>("medium");

  useEffect(() => {
    width >= 1200
      ? setScreenSize("large")
      : width >= 768
      ? setScreenSize("medium")
      : setScreenSize("small");
  }, [width]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { list } = await getItems();

        const sortedItems = [...list].sort((a, b) => b[order] - a[order]);
        setItems(sortedItems);

        const sortedItemsByFavorite = list.sort(
          (a: Item, b: Item) => b.favoriteCount - a.favoriteCount
        );

        const favoriteItemList = sortedItemsByFavorite.slice(
          0,
          BEST_ITEMS_LIMIT[screenSize]
        );
        setBestItems(favoriteItemList);

        if (searchValue) {
          const searchedItem = list.filter((item: Item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
          });
          setItems(searchedItem);
        }
      } catch (error) {
        console.error("상품 목록을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchItems();
  }, [order, screenSize, searchValue]);

  const {
    currentPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
    goToPage,
    paginatedList,
  } = usePagination<Item>(items, ITEMS_LIMIT[screenSize]);

  return (
    <>
      <S.Wrapper>
        <S.BestItemSection bestItems={bestItems} />

        <S.ItemSection>
          <S.ItemTitleSection>
            <span>판매중인 상품</span>
            <Link to="/additem">
              <S.ItemPageAddItemBtn size="small">
                상품 등록하기
              </S.ItemPageAddItemBtn>
            </Link>
            <S.ItemPageSearchInput
              placeholder="검색할 상품을 입력해주세요"
              value={searchValue}
              onChange={setSearchValue}
            />
            <S.ItemPageSelectBox
              onClick={setOrder}
              order={order}
              size={
                screenSize === "small" ? "small" : "medium"
              }></S.ItemPageSelectBox>
          </S.ItemTitleSection>
          <div>
            {paginatedList?.map((item: Item) => (
              <S.ItemCard key={item.id} item={item} />
            ))}
          </div>
        </S.ItemSection>

        <S.ItemPagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          goToPage={goToPage}></S.ItemPagePagination>
      </S.Wrapper>
    </>
  );
}

export default ItemPage;
