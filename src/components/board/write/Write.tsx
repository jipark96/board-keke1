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
import TextField from "../../common/textfield/TextField";
import { createBoard } from "../../../api/boardApi";

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
      const newFiles = Array.from(event.target.files); //배열로 변환
      setSelectedFiles([
        ...selectedFiles,
        ...newFiles.map((file) => file.name),
      ]);
      setFiles([...files, ...newFiles]); // 기존 파일 목록에 새로운 파일들 추가
    }
  };

  //[파일 삭제]
  const handleFileRemove = (index: number) => {
    const updatedSelectedFiles = selectedFiles.filter(
      (_file, idx) => idx !== index // 선택된 파일 목록에서 해당 인덱스 제외
    );
    const updatedFiles = files.filter((_file, idx) => idx !== index); // 파일 목록에서 해당 인덱스 제외

    setSelectedFiles(updatedSelectedFiles);
    setFiles(updatedFiles);
  };

  //[글 쓰기]
  const handleSubmit = async () => {
    try {
      await createBoard(title, content, files);
      alert("게시물 작성 완료");
      navigation("/board");
    } catch (error) {
      console.error("게시물 작성 오류:", error);
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
