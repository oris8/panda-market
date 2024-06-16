import Link from "next/link";
import BestBadge from "@/components/PageComponents/boards/BestBadge";
import PostContent from "@/components/PageComponents/boards/PostContent";
import WriterInfo from "@/components/WriterInfo/WriterInfo";

interface BestPostProps {
  className?: string;
  data: Post;
}

const BestPost = ({ className = "", data }: BestPostProps) => {
  const { id, title, content, image, likeCount, createdAt, writer } = data;

  return (
    <div
      className={`${className} h-167 w-343 rounded-8 bg-cool-gray-100 px-24 pb-16`}
    >
      <BestBadge />
      <div className="mt-16">
        <Link href={`/addboard/${id}`}>
          <PostContent title={title} content={content} image={image} />
        </Link>
      </div>

      <WriterInfo className="flex items-center pt-16">
        <WriterInfo.Writer nickname={writer.nickname} className="mr-8" />
        <WriterInfo.Favorite likeCount={likeCount} />
        <WriterInfo.CreatedAt createdAt={createdAt} className="ml-auto" />
      </WriterInfo>
    </div>
  );
};

export default BestPost;
