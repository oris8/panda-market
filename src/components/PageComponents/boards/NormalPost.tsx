import Link from "next/link";
import PostContent from "@/components/PageComponents/boards/PostContent";
import WriterInfo from "@/components/WriterInfo/WriterInfo";

interface NormalPostProps {
  className?: string;
  data: Post;
}

const NormalPost = ({ className = "", data }: NormalPostProps) => {
  const { id, title, content, image, likeCount, createdAt, writer } = data;

  return (
    <div className={`mt-24 min-h-136 w-full min-w-343 bg-white ${className}`}>
      <Link href={`/addboard/${id}`}>
        <PostContent title={title} content={content} image={image} />
      </Link>

      <WriterInfo className="flex items-center pt-16">
        <WriterInfo.ProfileImage className="mr-8" size={24} />
        <WriterInfo.Writer nickname={writer.nickname} className="mr-8" />
        <WriterInfo.CreatedAt createdAt={createdAt} />
        <WriterInfo.Favorite likeCount={likeCount} className="ml-auto" />
      </WriterInfo>
    </div>
  );
};

export default NormalPost;
