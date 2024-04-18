import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Card from "../components/Card";
import Button from "../components/Button";
import Searchbar from "../components/Searchbar";
import SortSelectBox from "../components/SortSelectBox";
import Pagination from "../components/Pagination";

import { getItems } from "../services/api";
import useWindowSize from "../hooks/useWindowSize";
import usePagination from "../hooks/usePagination";

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
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [searchValue, setSearchValue] = useState("");
  const { width } = useWindowSize();
  const [screenSize, setScreenSize] = useState("small");

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
          (a, b) => b.favoriteCount - a.favoriteCount
        );

        const favoriteItemList = sortedItemsByFavorite.slice(
          0,
          BEST_ITEMS_LIMIT[screenSize]
        );
        setBestItems(favoriteItemList);

        if (searchValue) {
          const searchedItem = list.filter((item) => {
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
  } = usePagination(items, ITEMS_LIMIT[screenSize]);

  return (
    <>
      <StyledDiv className="ItemPage">
        <div className="ItemPage__best-section">
          <span className="ItemPage__title">베스트 상품</span>
          <div className="ItemPage__best-item-list">
            {bestItems.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="ItemPage__section">
          <div className="ItemPage__title-section">
            <span className="ItemPage__title">판매중인 상품</span>
            <Link to="/additem">
              <Button className="ItemPage__additem-btn" size="small">
                상품 등록하기
              </Button>
            </Link>
            <Searchbar
              placeholder="검색할 상품을 입력해주세요"
              className="ItemPage__search-bar"
              value={searchValue}
              onChange={setSearchValue}
            />
            <SortSelectBox
              className="ItemPage__select-box"
              onClick={setOrder}
              order={order}
              size={screenSize === "small" ? "small" : "medium"}
            ></SortSelectBox>
          </div>
          <div className="ItemPage__item-list">
            {paginatedList.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
        <Pagination
          className="ItemPage__pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          goToPrevPage={goToPrevPage}
          goToNextPage={goToNextPage}
          goToPage={goToPage}
        ></Pagination>
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 17px 16px;
  margin-top: 70px;
  margin-bottom: 62px;

  .ItemPage__best-section .ItemPage__title {
    margin-bottom: 16px;
  }

  /* title-section */

  .ItemPage__title-section {
    display: grid;
    grid-template-columns: 1fr calc(132px - 42px - 8px) 42px;
    grid-template-areas:
      "title btn btn"
      "search search sort";
    grid-gap: 8px;
  }

  .ItemPage__title {
    grid-area: title;
    margin: auto 0;
    font-weight: 700;
    font-size: 20px;
    color: #111827;
  }

  .ItemPage__additem-btn {
    grid-area: btn;
    width: 133px;
    height: 42px;
  }

  .ItemPage__search-bar {
    grid-area: search;
  }

  .ItemPage__search-bar input {
    width: 100%;
  }

  .ItemPage__select-box {
    grid-area: sort;
  }

  /* best-item-list */

  .ItemPage__best-item-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  /* item-list */

  .ItemPage__item-list {
    display: flex;
    flex-wrap: wrap;
  }

  .ItemPage__item-list .Card {
    width: calc(50% - 4px);
    margin-right: 8px;
  }

  .ItemPage__item-list .Card:nth-child(2n) {
    margin-right: 0;
  }

  /* pagination */

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
  }

  @media screen and (min-width: 768px) {
    .ItemPage__title-section {
      grid-template-columns: 1fr auto auto auto;
      grid-template-areas: "title search btn sort";
      grid-gap: 8px;
    }

    .ItemPage__search-bar input {
      width: 242px;
    }

    .ItemPage__best-item-list {
      margin-bottom: 40px;
    }

    .ItemPage__best-item-list .Card {
      width: calc(50% - 12px);
      margin-right: 24px;
    }

    .ItemPage__best-item-list .Card:nth-child(2n) {
      margin-right: 0;
    }

    .ItemPage__item-list .Card,
    .ItemPage__item-list .Card:nth-child(2n) {
      width: calc(33.3% - 12px);
      margin-right: 16px;
    }

    .ItemPage__item-list .Card:nth-child(3n) {
      margin-right: 0;
    }

    .ItemPage__title-section {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 1200px) {
    .ItemPage__search-bar input {
      width: 325px;
    }

    .ItemPage__best-item-list .Card,
    .ItemPage__best-item-list .Card:nth-child(2n) {
      width: calc(25% - 12px);
      margin-right: 16px;
    }

    .ItemPage__best-item-list .Card:nth-child(4n) {
      margin-right: 0;
    }

    .ItemPage__item-list .Card,
    .ItemPage__item-list .Card:nth-child(2n),
    .ItemPage__item-list .Card:nth-child(3n) {
      /* 19.2px = 24(margin-right값) % 5(요소 개수) * 4(gap개수)  */
      width: calc(20% - 19.2px);
      margin-right: 24px;
    }

    .ItemPage__item-list .Card:nth-child(5n) {
      margin-right: 0;
    }
  }
`;

export default ItemPage;
