import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

// 좋아요 요청을 보내는 함수
const sendLikeRequest = async (method: string, url: string) => {
  const options = {
    method: method,
    url: url,
  };
  await sendAxiosRequest(options);
};

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

  // 좋아요 상태 및 좋아요 수를 업데이트하는 함수
  const updateFavoriteButtonState = (newLikeState: boolean) => {
    setValues((prevValues) => ({
      isFavoriteButtonLiked: newLikeState,
      favoriteButtonLikeCount: newLikeState
        ? prevValues.favoriteButtonLikeCount + 1
        : prevValues.favoriteButtonLikeCount - 1,
    }));
  };

  const toggleFavoriteButton = async (id: number) => {
    if (!user) return alert("로그인 후 이용해주세요");

    try {
      // 좋아요 버튼 상태에 따라 요청 메소드 결정
      const method = isFavoriteButtonLiked ? "DELETE" : "POST";
      const url = `/${path}/${id}/like`;

      // 좋아요 처리 요청
      await sendLikeRequest(method, url);

      // 좋아요 버튼 상태 및 좋아요 수 업데이트
      updateFavoriteButtonState(!isFavoriteButtonLiked);
    } catch (error) {
      alert(error);
    }
  };

  return {
    toggleFavoriteButton,
    isFavoriteButtonLiked,
    favoriteButtonLikeCount,
  };
};

export default useFavoriteButton;
