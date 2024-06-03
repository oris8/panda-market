"use client";

import BestPost from "@/components/boards/BestPost";
import useDeviceSize from "@/hooks/useDeviceSize";
import { BEST_POST_LIMIT } from "@/constants/pageLimit";

interface BestPostListProps {
  className?: string;
  data: Post[];
}

const BestPostList = ({ className = "", data }: BestPostListProps) => {
  const deviceSize = useDeviceSize();

  const showBestPostList = data.slice(0, BEST_POST_LIMIT[deviceSize]);

  return (
    <div className={`flex gap-8 ${className}`}>
      {data && data.length !== 0 ? (
        showBestPostList.map((post) => (
          <BestPost
            key={post.id}
            data={post}
            className="h-167 w-343 flex-grow"
          />
        ))
      ) : (
        <div className="text-center text-gray-500">
          아직 베스트 게시글이 없어요
        </div>
      )}
    </div>
  );
};

export default BestPostList;
