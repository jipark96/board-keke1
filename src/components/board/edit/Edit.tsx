import React, { useEffect, useState } from "react";
import {
  BtnWrapper,
  LargeTextFieldInput,
  LargeTextFieldTitle,
  Remove,
  TextFieldInput,
  TextFieldWrap,
  Wrapper,
} from "./EditStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout/Layout";
import axios from "axios";
import TextField from "../../common/textfield/TextField";

const Edit = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originFiles, setOriginFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [removedOriginFiles, setRemovedOriginFiles] = useState<string[]>([]);

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

      // 선택한 파일들의 이름을 selectedFiles 상태에 추가
      setSelectedFiles([
        ...selectedFiles,
        ...newFiles.map((file) => file.name),
      ]);

      // 선택한 파일들을 files 상태에 추가
      setFiles([...files, ...newFiles]);
    }
  };

  //[파일 삭제]
  const handleFileRemove = (index: number) => {
    // 선택한 파일 상태에서 해당 인덱스의 파일 이름을 제외한 나머지 파일들을 선택
    const updatedSelectedFiles = selectedFiles.filter(
      (_file, idx) => idx !== index
    );

    // 선택한 파일 상태에서 해당 인덱스의 파일을 제외한 나머지 파일들을 선택
    const updatedFiles = files.filter((_file, idx) => idx !== index);

    setSelectedFiles(updatedSelectedFiles);
    setFiles(updatedFiles);
  };

  //[기존 파일 삭제]
  const handleOriginFileRemove = (index: number) => {
    // 삭제할 파일의 이름을 removedFile로 가져옴
    const removedFile = originFiles[index];

    // 기존 파일들 중에서 해당 인덱스의 파일을 제외한 나머지 파일들을 선택
    const updatedOriginFiles = [...originFiles];
    updatedOriginFiles.splice(index, 1);
    setOriginFiles(updatedOriginFiles);

    setRemovedOriginFiles([...removedOriginFiles, removedFile]);
  };

  //[기존 글 가져오기]
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `http://localhost:8080/board/${boardId}`
      );
      setTitle(response.data.result.title);
      setContent(response.data.result.content);
      if (response.data.result.fileList) {
        setOriginFiles(
          response.data.result.fileList.map((file: any) => file.fileName)
        );
      }
    };

    fetchPost();
  }, [boardId]);

  //[수정 하기]
  const handlePatchClick = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      // 새로운 첨부파일과 지워야 할 첨부파일 목록 전송
      files.forEach((file) => formData.append("files", file));

      // 서버에게 지워야 할 첨부파일 목록 전송(배열 -> 문자열 변환)
      if (removedOriginFiles.length > 0) {
        let deleted_list = JSON.stringify(removedOriginFiles);
        formData.append("deleted", deleted_list);
      }

      await axios.patch(
        `http://localhost:8080/board/edit/${boardId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigation("/board");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <TextFieldWrap>
          <LargeTextFieldTitle>제목</LargeTextFieldTitle>
          <TextFieldInput
            placeholder="제목"
            value={title}
            onChange={handleTitleChange}
          />
        </TextFieldWrap>

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
          {originFiles &&
            originFiles.map((fileName, index) => (
              <li key={`originFile-${index}`}>
                {fileName}
                <Remove onClick={() => handleOriginFileRemove(index)}>
                  &times;
                </Remove>
              </li>
            ))}
        </ul>
        <ul>
          {selectedFiles.map((fileName, index) => (
            <li key={index}>
              {fileName}
              <Remove onClick={() => handleFileRemove(index)}>&times;</Remove>
            </li>
          ))}
        </ul>
        <BtnWrapper>
          <Btn
            text="수정"
            size="small"
            disabled={false}
            onClick={handlePatchClick}
          />
        </BtnWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Edit;
