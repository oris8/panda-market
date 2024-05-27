import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as S from "./ItemDetailPage.style.js";
import ItemDetailPageCardLarge from "./ItemDetailPageCardLarge.js";
import CommentInputBox from "../../components/CommentInputBox.js";
import Comment from "../../components/Comment.js";
import { getItem, getItemComments } from "../../services/api.js";
import BackIcon from "../../assets/icon/back.svg?react";
import EmptyCommentImage from "../../assets/img/Img_inquiry_empty.png";

const EmptyCommentImageSection = () => {
  return (
    <S.EmptyCommentImageSection>
      <S.EmptyCommentImage src={EmptyCommentImage} alt="댓글이 없습니다" />
      <p>아직 댓글이 없습니다</p>
    </S.EmptyCommentImageSection>
  );
};

const ItemDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (id) {
          const item = await getItem(id);
          setProduct(item);
        }
      } catch (err) {
        console.error("상품을 불러오는 중 오류가 발생했습니다:", err);
      }
    };

    const fetchItemComments = async () => {
      try {
        if (id) {
          const itemComments = await getItemComments(id);
          setComments(itemComments.list);
        }
      } catch (err) {
        console.error("상품 댓글을 불러오는 중 오류가 발생했습니다:", err);
      }
    };

    fetchItem();
    fetchItemComments();
  }, [id]);

  return (
    <>
      {product && (
        <S.ItemDetailPageWrapper>
          <ItemDetailPageCardLarge data={product} />
          <CommentInputBox title="문의하기" />
          {comments.length > 0 ? (
            comments.map((comment: Comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <EmptyCommentImageSection />
          )}
          <Link to="/items">
            <S.ToGoItemPageBtn>
              목록으로 돌아가기
              <BackIcon />
            </S.ToGoItemPageBtn>
          </Link>
        </S.ItemDetailPageWrapper>
      )}
    </>
  );
};

export default ItemDetailPage;
