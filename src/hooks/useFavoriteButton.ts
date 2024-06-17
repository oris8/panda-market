import { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import sendAxiosRequest from "@/lib/api/sendAxiosRequest";

// 좋아요 요청을 보내는 함수
const sendLikeRequest = async (method: string, url: string) => {
  const options = {
    method: method,
    url: url,
  };
  const res = await sendAxiosRequest(options);
  return res.data;
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
  const updateFavoriteButtonState = (
    newIsLiked: boolean,
    newLikeCount: number,
  ) => {
    setValues({
      isFavoriteButtonLiked: newIsLiked,
      favoriteButtonLikeCount: newLikeCount,
    });
  };

  const toggleFavoriteButton = async (id: number) => {
    if (!user) return alert("로그인 후 이용해주세요");

    try {
      // 좋아요 버튼 상태에 따라 요청 메소드 결정
      const method = isFavoriteButtonLiked ? "DELETE" : "POST";
      const url = path.replace("id", id.toString());

      // 좋아요 처리 요청
      const res = await sendLikeRequest(method, url);
      updateFavoriteButtonState(res.isLiked, res.likeCount);
    } catch (error) {
      alert(error);
    }
  };

  return {
    toggleFavoriteButton,
    updateFavoriteButtonState,
    isFavoriteButtonLiked,
    favoriteButtonLikeCount,
  };
};

export default useFavoriteButton;
