"use client";

import useFavoriteButton from "@/hooks/useFavoriteButton";
import { usePathname } from "next/navigation";
import HeartIcon from "/public/images/ic_heart.svg";
import HeartActiveIcon from "/public/images/ic_heart-active.svg";

interface FavoriteButtonProps {
  className?: string;
  id?: number;
  isFavorite?: boolean;
  favoriteCount: number;
}

const FavoriteButton = ({
  className = "",
  id,
  isFavorite = false,
  favoriteCount,
}: FavoriteButtonProps) => {
  const pathname = usePathname();

  const { toggleFavoriteButton, isLiked, likeCount } = useFavoriteButton(
    pathname,
    isFavorite,
    favoriteCount,
  );

  const handleClick = () => {
    if (id) {
      toggleFavoriteButton(id);
    }
  };

  return (
    <button
      className={`flex cursor-pointer items-center gap-4 bg-transparent p-0 text-12 font-medium ${className}`}
      onClick={handleClick}
    >
      {isLiked ? (
        <HeartActiveIcon width="16" height="16" viewBox="0 0 24 24" />
      ) : (
        <HeartIcon
          width="16"
          height="16"
          styles="color: var(--color-cool-gray-500)"
        />
      )}
      {likeCount}
    </button>
  );
};

export default FavoriteButton;
