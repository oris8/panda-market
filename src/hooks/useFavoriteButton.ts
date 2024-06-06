import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

const useFavoriteButton = (
  path: string,
  isLiked: boolean,
  likeCount: number,
) => {
  const [values, setValues] = useState({
    isFavoriteButtonLiked: isLiked,
    favoriteButtonLikeCount: likeCount,
  });
  const { user } = useAuth();

  const { isFavoriteButtonLiked, favoriteButtonLikeCount } = values;

  const toggleFavoriteButton = async (id: number) => {
    if (!user) return alert("로그인 후 이용해주세요");

    if (isFavoriteButtonLiked) {
      // 좋아요한 경우 좋아요 삭제
      const options = {
        method: "DELETE",
        url: `/${path}/${id}/like`,
      };
      await sendAxiosRequest(options);
      setValues((prevValues) => ({
        ...prevValues,
        isFavoriteButtonLiked: false,
        favoriteButtonLikeCount: prevValues.favoriteButtonLikeCount - 1,
      }));
    } else {
      // 좋아요 안되어있는 경우 좋아요 추가
      const options = {
        method: "POST",
        url: `/${path}/${id}/like`,
      };
      await sendAxiosRequest(options);
      setValues((prevValues) => ({
        ...prevValues,
        isFavoriteButtonLiked: true,
        favoriteButtonLikeCount: prevValues.favoriteButtonLikeCount + 1,
      }));
    }
  };

  return {
    toggleFavoriteButton,
    isFavoriteButtonLiked,
    favoriteButtonLikeCount,
  };
};

export default useFavoriteButton;
