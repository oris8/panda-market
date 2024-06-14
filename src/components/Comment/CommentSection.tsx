import { useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button/Button";
import CommentInput from "@/components/Comment/CommentInput";
import Comment from "@/components/Comment/Comment";
import CommentEmpty from "@/components/Comment/CommentEmpty";
import { useAuth } from "@/contexts/AuthProvider";
import BackIcon from "/public/images/ic_back.svg";

interface CommentSectionProps {
  initialData: CommentResponse;
  dataFetcher: (cursor?: number) => Promise<CommentResponse>;
  returnPath?: string;
}

const CommentSection = ({
  initialData,
  dataFetcher,
  returnPath = "/",
}: CommentSectionProps) => {
  const { user } = useAuth();
  const [values, setValues] = useState(initialData);
  const { nextCursor, list } = values;
  const pathname = usePathname();

  const fetchComments = async (cursor?: number) => {
    const data = await dataFetcher(cursor);

    setValues((prev) => ({
      ...prev,
      list: [...prev.list, ...data.list],
      nextCursor: data.nextCursor,
    }));
  };

  const handleCommentAdded = (newComment: Comment) => {
    console.dir(pathname);
    setValues((prev) => ({
      ...prev,
      list: [newComment, ...prev.list],
    }));
  };

  const handleCommentDeleted = (deletedComment: Comment) => {
    setValues((prev) => {
      const updatedList = prev.list.filter(
        (comment) => comment.id !== deletedComment.id,
      );

      return {
        ...prev,
        list: updatedList,
      };
    });
  };

  return (
    <>
      <CommentInput
        label="댓글 달기"
        placeholder="댓글을 입력해주세요"
        onCommentAdded={handleCommentAdded}
      />
      <div className="mt-24 flex flex-col gap-24 pb-120 ">
        {list.length > 0 ? (
          <>
            {list.map((comment: Comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                isUserComment={(user && comment.writer.id === user.id) || false}
                onCommentDeleted={handleCommentDeleted}
              />
            ))}
            {nextCursor && (
              <Button
                className="mx-auto h-42 w-88 rounded-8 border-1 border-gray-400 text-gray-600"
                onClick={() => fetchComments(nextCursor)}
              >
                .. 더보기
              </Button>
            )}
          </>
        ) : (
          <CommentEmpty />
        )}
        <Button.Link
          className="primary-rounded-button mx-auto mt-40 h-48 w-240 gap-10 text-18"
          href={returnPath}
        >
          목록으로 돌아가기
          <BackIcon />
        </Button.Link>
      </div>
    </>
  );
};

export default CommentSection;
