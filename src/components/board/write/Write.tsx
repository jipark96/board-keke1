import React, { useState } from "react";
import {
  BtnWrapper,
  LargeTextFieldInput,
  LargeTextFieldTitle,
  TextFieldWrap,
  Wrapper,
} from "./WriteStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout/Layout";
import axios from "axios";
import TextField from "../../common/textfield/TextField";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const navigation = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      files.forEach((file) => formData.append("files", file));

      await axios.post(`http://localhost:8080/board`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
        params: {
          username: username,
        },
      });
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
        <TextField
          title="제목"
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleChange}
        />
        <TextFieldWrap>
          <LargeTextFieldTitle>내용</LargeTextFieldTitle>
          <LargeTextFieldInput
            placeholder="내용"
            value={content}
            onChange={handleContentChange}
          />
        </TextFieldWrap>

        <TextField
          title="파일"
          type="file"
          placeholder="파일"
          onChange={handleFileChange}
          multiple
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
