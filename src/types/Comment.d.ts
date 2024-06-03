interface CommentWriter {
  image: string;
  nickname: string;
  id: number;
}

interface Comment {
  writer: CommentWriter;
  updatedAt: Date;
  createdAt: Date;
  content: string;
  id: number;
}
