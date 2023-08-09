import React, { useState } from "react";
import { BtnWrapper, Input1, Input2, Wrapper } from "./WriteStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigation = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const jwtToken = localStorage.getItem("jwtToken");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8080/board",
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      alert("게시물 작성 완료");
      navigation("/board");
    } catch (error) {
      console.error("게시물 작성 오류: ", error);
      alert("게시물 작성 실패");
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Input1 placeholder="제목" value={title} onChange={handleTitleChange} />
        <Input2
          placeholder="내용"
          value={content}
          onChange={handleContentChange}
        />
        <BtnWrapper>
          <Btn
            text="작성"
            size="small"
            disabled={false}
            onClick={handleSubmit}
          />
        </BtnWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Write;
