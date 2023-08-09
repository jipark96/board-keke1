import React, { useEffect, useState } from "react";
import { BtnWrapper, Input1, Input2, Wrapper } from "./EditStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout/Layout";
import axios from "axios";

const Edit = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigation = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `http://localhost:8080/board/${boardId}`
      );
      setTitle(response.data.result.title);
      setContent(response.data.result.content);
    };

    fetchPost();
  }, [boardId]);

  const handlePatchClick = async () => {
    try {
      await axios.patch(`http://localhost:8080/board/edit/${boardId}`, {
        title,
        content,
      });
      navigation("/board");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Input1
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input2
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
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
