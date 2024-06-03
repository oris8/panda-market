import { useState } from "react";
import useDataFetch from "@/hooks/useDataFetch";

const useFavoriteButton = (
  path: string,
  isFavorite: boolean,
  favoriteCount: number,
) => {
  const [values, setValues] = useState({
    isLiked: isFavorite,
    likeCount: favoriteCount,
  });
  const { isLiked, likeCount } = values;
  const { axiosFetcher } = useDataFetch();

  const handleFavoriteClick = async (id: number) => {
    //TODO user 여부 판단 후 click handler 진행
    // if (!user) return;
    return;

    if (isLiked) {
      // 좋아요한 경우 좋아요 삭제
      const options = {
        method: "DELETE",
        url: `/${path}/${id}/like`,
      };
      await axiosFetcher(options);
      setValues((prevValues) => ({
        ...prevValues,
        isLiked: false,
        likeCount: prevValues.likeCount - 1,
      }));
    } else {
      // 좋아요 안되어있는 경우 좋아요 추가
      const options = {
        method: "POST",
        url: `/${path}/${id}/like`,
      };
      await axiosFetcher(options);
      setValues((prevValues) => ({
        ...prevValues,
        isLiked: true,
        likeCount: prevValues.likeCount + 1,
      }));
    }
  };

  return { handleFavoriteClick, isLiked, likeCount };
};

export default useFavoriteButton;
