import Image from "next/image";
import FavoriteButton from "@/components//FavoriteButton";

interface PostInfoProps {
  showProfile?: boolean;
  writer?: {
    id: string;
    nickname: string;
  };
  likeCount?: number;
  createdAt?: string;
}

const PostInfo = ({
  showProfile = true,
  writer,
  likeCount,
  createdAt,
}: PostInfoProps) => {
  return (
    <>
      {showProfile && writer && (
        <div className="mr-8 h-24 w-24">
          <Image
            src="/images/img_default-profile.png"
            alt="Writer Image"
            width={24}
            height={24}
          />
        </div>
      )}
      {writer && (
        <div className="postInfoWriter text-14 font-normal text-cool-gray-600">
          {writer.nickname}
        </div>
      )}
      {createdAt && (
        <div className="postInfoCreatedAt text-14 font-normal text-cool-gray-400">
          {createdAt}
        </div>
      )}
      {likeCount !== undefined && (
        <FavoriteButton
          className="postInfoFavorites text-14 font-normal text-cool-gray-500"
          favoriteCount={likeCount}
        />
      )}
    </>
  );
};

export default PostInfo;
