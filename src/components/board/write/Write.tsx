import React, { useState } from "react";
import {
  BtnWrapper,
  LargeTextFieldInput,
  LargeTextFieldTitle,
  Remove,
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
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const navigation = useNavigate();

  //[제목]
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //[내용]
  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  //[파일 첨부]
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setSelectedFiles([
        ...selectedFiles,
        ...newFiles.map((file) => file.name),
      ]);
      setFiles([...files, ...newFiles]);
    }
  };

  //[파일 삭제]
  const handleFileRemove = (index: number) => {
    const updatedSelectedFiles = selectedFiles.filter(
      (_file, idx) => idx !== index
    );
    const updatedFiles = files.filter((_file, idx) => idx !== index);

    setSelectedFiles(updatedSelectedFiles);
    setFiles(updatedFiles);
  };

  const jwtToken = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("username");

  //[글 쓰기]
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
        <ul>
          {selectedFiles.map((fileName, index) => (
            <li key={index}>
              {fileName}
              <Remove onClick={() => handleFileRemove(index)}> &times;</Remove>
            </li>
          ))}
        </ul>

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
