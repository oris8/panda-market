interface PostWriter {
  nickname: string;
  id: number;
}

interface Post {
  updatedAt: Date;
  createdAt: Date;
  isLiked?: boolean;
  likeCount: number;
  writer: PostWriter;
  image: string;
  content: string;
  title: string;
  id: number;
}
