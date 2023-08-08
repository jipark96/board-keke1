import React from "react";
import {
  Comment1,
  CommentContent,
  CommentDate,
  CommentDateWrap,
  CommentHeader,
  CommentUserName,
  Input,
} from "./CommentStyles";

import Btn from "../../../common/btn/Btn";

const Comment = () => {
  return (
    <>
      <CommentHeader>
        <Input />
        <Btn text="등록" size="small" />
      </CommentHeader>
      <Comment1>
        <CommentDateWrap>
          <CommentDate>날짜</CommentDate>
        </CommentDateWrap>
        <CommentContent>내용</CommentContent>
        <CommentUserName>아이디</CommentUserName>
        <hr />
      </Comment1>
    </>
  );
};

export default Comment;
