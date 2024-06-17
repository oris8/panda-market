import Image from "next/image";
import FavoriteButton from "@/components/Button/FavoriteButton";
import getTimeAgo from "@/lib/utils/getTimeAgo";
import formatDate from "@/lib/utils/formatDate";
import { DEFAULT_PROFILE_IMAGE } from "@/constants/defaultImages";

const WriterInfoWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`${className}`}>{children}</div>;

const ProfileImage = ({
  className,
  src,
  size = 24,
  alt = "Writer Image",
}: {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}) => (
  <div className={` ${className} w-${size} h-${size}`}>
    <Image
      src={src || DEFAULT_PROFILE_IMAGE}
      alt={alt}
      width={size}
      height={size}
      className="rounded-[50%]"
    />
  </div>
);

const Writer = ({
  className,
  nickname = "똑똑한 판다",
}: {
  className?: string;
  nickname: string;
}) => (
  <div
    className={`postInfoWriter text-14 font-normal text-cool-gray-600 ${className}`}
  >
    {nickname}
  </div>
);

const CreatedAt = ({
  className,
  createdAt,
}: {
  className?: string;
  createdAt: Date;
}) => (
  <div
    className={`postInfoCreatedAt text-14 font-normal text-cool-gray-400 ${className}`}
  >
    {formatDate(createdAt)}
  </div>
);

const UpdatedAt = ({
  className,
  createdAt,
}: {
  className?: string;
  createdAt: Date;
}) => {
  const formatUpdatedAt = getTimeAgo(createdAt);

  return (
    <div
      className={`postInfoCreatedAt text-14 font-normal text-cool-gray-400 ${className}`}
    >
      {formatUpdatedAt}
    </div>
  );
};

const Favorite = ({
  className,
  likeCount,
  ...rest
}: {
  className?: string;
  likeCount: number;
}) => (
  <FavoriteButton
    className={`postInfoFavorites text-14 font-normal text-cool-gray-500 ${className}`}
    likeCount={likeCount}
    {...rest}
  />
);

const WriterInfo = Object.assign(WriterInfoWrapper, {
  ProfileImage: ProfileImage,
  Writer: Writer,
  CreatedAt: CreatedAt,
  UpdatedAt: UpdatedAt,
  Favorite: Favorite,
});

export default WriterInfo;
