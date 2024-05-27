import { useState } from "react";
import styled from "styled-components";
import BaseButton from "./BaseButton";
import BaseTextArea from "./BaseTextArea";
import { postItemComment } from "../services/api";
import { useParams } from "react-router-dom";

const placeholder =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

interface CommentInputBoxProps {
  className?: string;
  title: string;
}

const CommentInputBox = ({ className, title }: CommentInputBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddComment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (id) {
      postItemComment(inputValue, id);
      setInputValue("");
    }
  };

  return (
    <StyledInputGroup className={className}>
      <label>{title}</label>
      <StyledInput
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
      />
      <StyledAddCommentBtn size="small" onSubmit={() => handleAddComment}>
        등록
      </StyledAddCommentBtn>
    </StyledInputGroup>
  );
};

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > label {
    font-size: 16px;
    font-weight: 600;
    color: ##111827;
  }
`;
const StyledInput = styled(BaseTextArea)`
  height: 104px;
  padding: 16px 24px;
`;

const StyledAddCommentBtn = styled(BaseButton)`
  width: 71px;
  height: 42px;
  margin-left: auto;
  font-size: 14px;
`;
export default CommentInputBox;
