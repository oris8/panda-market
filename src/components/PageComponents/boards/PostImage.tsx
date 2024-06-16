import Image from "next/image";
import { EMPTY_POST_IMAGE } from "@/constants/defaultImages";

interface PostImageProps {
  src: string | null;
  alt: string;
}

const PostImage = ({ src, alt }: PostImageProps) => {
  const verifiedImageSrc = src?.startsWith(
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
  )
    ? src
    : EMPTY_POST_IMAGE;

  return (
    <div className="relative h-72 w-72 overflow-hidden rounded-8 border-[0.75px] border-cool-gray-200">
      <Image
        src={verifiedImageSrc}
        alt={alt}
        fill
        sizes="100%, 100%"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default PostImage;
