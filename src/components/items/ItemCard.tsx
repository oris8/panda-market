"use client";

import Link from "next/link";
import ItemFavoriteButton from "@/components/items/ItemFavoriteButton";
import ItemCardImage from "@/components/items/ItemCardImage";

interface ItemPageCardProps {
  className?: string;
  data: Item;
}

function ItemCard({ data, className }: ItemPageCardProps) {
  const { id, name, price, favoriteCount, isFavorite = false, images } = data;

  const previewImage = images[0];
  const formattedPrice = `${price.toLocaleString()}원`;

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <Link href={`/items/${id}`}>
        <div className={`mt-16 flex flex-col gap-8`}>
          <ItemCardImage
            src={previewImage}
            alt={name}
            className="pb-full h-full w-full overflow-hidden rounded-[15%]"
          />
          <p className="text-14 font-medium">{name}</p>
          <p className="text-16 font-bold">{formattedPrice}</p>
        </div>
      </Link>
      <div className="flex h-6 w-16 items-center gap-2">
        <ItemFavoriteButton
          id={id}
          isFavorite={isFavorite}
          favoriteCount={favoriteCount}
        />
      </div>
    </div>
  );
}

export default ItemCard;
