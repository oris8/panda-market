"use client";

import ItemCard from "@/components/items/ItemCard";
import Image from "next/image";
import useDeviceSize from "@/hooks/useDeviceSize";
import { BEST_ITEM_LIMIT } from "@/constants/pageLimit";

interface BestItemListProps {
  className?: string;
  data: Item[];
}

const BestItemList = ({ className = "", data }: BestItemListProps) => {
  const deviceSize = useDeviceSize();
  const sliceData = data.slice(0, BEST_ITEM_LIMIT[deviceSize]);

  return (
    <div className={`${className}`}>
      <div className="text-20 font-bold text-cool-gray-800">베스트 상품</div>
      <div>
        {data && data.length !== 0 ? (
          <>
            <div className="flex justify-between gap-8">
              {sliceData.map((item: Item) => (
                <ItemCard key={item.id} data={item} className={`w-full`} />
              ))}
            </div>
          </>
        ) : (
          <div className="flexcenter mt-88 flex-col py-16 text-20 font-medium text-gray-500">
            <Image
              src="/images/img_inquiry-empty.svg"
              alt="아무것도 없어요 u.u"
              width={140}
              height={140}
            />
            상품이 없어요
          </div>
        )}
      </div>
    </div>
  );
};

export default BestItemList;
