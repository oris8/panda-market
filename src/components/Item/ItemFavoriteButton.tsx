"use client";

import useFavoriteButton from "@/hooks/useFavoriteButton";
import FavoriteButton from "../Button/FavoriteButton";

interface ItemFavoriteButtonProps {
  id: number;
  isFavorite: boolean;
  favoriteCount: number;
  className?: string;
}

const ItemFavoriteButton = ({
  id,
  isFavorite,
  favoriteCount,
  className = "",
}: ItemFavoriteButtonProps) => {
  const {
    toggleFavoriteButton,
    isFavoriteButtonLiked,
    favoriteButtonLikeCount,
  } = useFavoriteButton("products/id/favorite", isFavorite, favoriteCount);

  return (
    <FavoriteButton
      isLiked={isFavoriteButtonLiked}
      likeCount={favoriteButtonLikeCount}
      onClick={() => toggleFavoriteButton(id)}
      className={className}
    />
  );
};

export default ItemFavoriteButton;
