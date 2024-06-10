import Image from "next/image";

const CommentEmpty = () => {
  return (
    <div className="flexcenter flex-col">
      <Image
        src="/images/img_reply-empty.png"
        alt="댓글이 없어요!"
        width={140}
        height={140}
      />
      <p className="text-400 text-center text-16 leading-24 text-cool-gray-400">
        아직 댓글이 없어요,
        <br />
        지금 댓글을 달아보세요!
      </p>
    </div>
  );
};

export default CommentEmpty;
