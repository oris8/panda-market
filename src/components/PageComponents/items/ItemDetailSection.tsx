"use client";

import ItemFavoriteButton from "@/components/Item/ItemFavoriteButton";
import ItemCardImage from "@/components/Item/ItemCardImage";
import ItemTag from "@/components/Item/ItemTag";
import { useAuth } from "@/contexts/AuthProvider";
import { useEffect, useState } from "react";
import useDataFetch from "@/hooks/useDataFetch";
import Button from "../../Button/Button";
import { useRouter } from "next/navigation";

const ItemDetailSection = ({ initialData }: { initialData: Item }) => {
  const {
    id,
    name,
    price,
    description,
    tags,
    images,
    isFavorite,
    favoriteCount,
  } = initialData;

  const [data, setData] = useState<Item>(initialData);
  const [isUserItem, setIsUserItem] = useState(false);
  const { user } = useAuth();
  const { isLoading, axiosFetcher } = useDataFetch();
  const router = useRouter();

  const formatPrice = price.toLocaleString();

  const deleteItem = async () => {
    const options = {
      method: "DELETE",
      url: `/products/${id}`,
    };
    await axiosFetcher(options);
    router.replace("/items");
  };

  // 본인 게시글인지 판단하는 useEffect
  useEffect(() => {
    if (user && data?.ownerId === user.id) {
      setIsUserItem(true);
    } else setIsUserItem(false);
  }, [user, data]);

  return (
    <div className="flex flex-col gap-4 border-b border-gray-300 md:flex-row md:border-none">
      <ItemCardImage
        src={images?.[0]}
        alt={name}
        className="md:mr-24 md:h-auto md:w-486"
      />
      <div className="flex flex-grow flex-col">
        <div className="mb-16">
          <p className="text-lg font-semibold md:text-xl">{name}</p>
          <p className="border-b border-gray-300 pb-16 text-40 font-semibold md:text-32">
            {formatPrice}
          </p>
        </div>
        <div className="mb-16">
          <p className="font-medium text-gray-500">상품 소개</p>
          <p className="font-normal text-gray-700">{description}</p>
        </div>
        <p className="font-medium text-gray-500">상품태그</p>
        <div className="mb-24 mt-8 flex h-auto w-full flex-wrap gap-8">
          {tags.map((tag) => (
            <ItemTag tag={tag} />
          ))}
        </div>
        <div>
          <ItemFavoriteButton
            id={id}
            isFavorite={isFavorite}
            favoriteCount={favoriteCount}
            className="mb-16 flex h-40 w-auto items-center gap-8 rounded-full border border-gray-200 px-16 text-sm md:text-base"
          />
        </div>
      </div>
      {isUserItem && <Button onClick={deleteItem}>삭제</Button>}
    </div>
  );
};

export default ItemDetailSection;
