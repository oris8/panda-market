"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import formatDate from "@/lib/utils/formatDate";
import FavoriteButton from "@/components/FavoriteButton";
import { useAuth } from "@/contexts/AuthProvider";
import useDataFetch from "@/hooks/useDataFetch";

const Post = ({ initialData }: { initialData: Post }) => {
  const { user } = useAuth();
  const { isLoading, axiosFetcher } = useDataFetch();
  const [data, setData] = useState<Post>(initialData);

  const { title, writer, id, likeCount, content, createdAt, image } = data;

  // 로그인 되어있으면 게시글 like 상태를 불러오는 useEffect
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const options = {
        method: "GET",
        url: `articles/${data.id}`,
      };
      const res = await axiosFetcher(options);
      setData(res.data);
    };

    fetchData();
  }, [user, id]);

  return (
    <>
      {!isLoading && (
        <>
          <div className="border-b-1 border-cool-gray-200 py-16">
            <h1 className="mb-16 text-20 font-bold leading-24 text-cool-gray-800">
              {title}
            </h1>
            <div className="flex items-center gap-8">
              <Image
                src="/images/img_default-profile.svg"
                alt="Default profile image"
                width={24}
                height={24}
              />
              <span className="mr-8 pb-2">{writer.nickname}</span>
              <span className="border-r border-cool-gray-200 pr-8 text-12 text-cool-gray-400">
                {formatDate(createdAt)}
              </span>
              <FavoriteButton
                id={id}
                isFavorite={data?.isLiked || false}
                favoriteCount={likeCount}
              />
            </div>
          </div>

          <div className="min-h-180 py-16 text-16 leading-24 text-cool-gray-800">
            {content}
            {image && (
              <Image
                src={image}
                alt="User uploaded image"
                width={140}
                height={140}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Post;
