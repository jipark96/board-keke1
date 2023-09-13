import React, { useEffect, useState } from "react";
import {
  BtnWrapper,
  Image,
  ImgRemove,
  ImgWrapper,
  LargeTextFieldInput,
  LargeTextFieldTitle,
  Remove,
  TextFieldInput,
  TextFieldWrap,
  Ul,
  Wrapper,
} from "./EditStyles";
import Btn from "../../common/btn/Btn";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout/Layout";
import TextField from "../../common/textfield/TextField";
import { getBoard, patchBoard } from "../../../api/boardApi";
import { serverUrl } from "../../../api/commonApi";

const Edit = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [originFiles, setOriginFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [removedOriginFiles, setRemovedOriginFiles] = useState<string[]>([]);

  const [originImagesUrl, setOriginImagesUrl] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const [removedOriginImageUrls, setRemovedOriginImageUrls] = useState<
    string[]
  >([]);

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

  //[이미지 업로드]
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 이미지 파일들을 배열로 변환
      const newImages = Array.from(event.target.files);

      // 기존 이미지 목록에 새로운 이미지들 추가
      setImages([...images, ...newImages]);

      // Blob URL 생성 후 selectedImageUrls 상태 업데이트
      const newImageUrls = newImages.map((image) => URL.createObjectURL(image));
      setSelectedImageUrls([...selectedImageUrls, ...newImageUrls]);
    }
  };

  //[이미지 삭제]
  const handleImageRemove = (index: number) => {
    // 선택한 파일 상태에서 해당 인덱스의 파일 이름을 제외한 나머지 파일들을 선택
    const updatedSelectedImages = selectedImageUrls.filter(
      (_image, idx) => idx !== index
    );
    setSelectedImageUrls(updatedSelectedImages);

    const removedImageUrl = selectedImageUrls[index];
    const updatedRemovedOriginImageUrls = [
      ...removedOriginImageUrls,
      removedImageUrl,
    ];
    setRemovedOriginImageUrls(updatedRemovedOriginImageUrls);

    const updatedImages = images.filter((_file, idx) => idx !== index);
    setImages(updatedImages);
  };

  //[기존 이미지 삭제]
  const handleOriginImageRemove = (index: number) => {
    const removedImageUrl = originImagesUrl[index];

    const updatedOriginImagesUrl = originImagesUrl.filter(
      (_image, idx) => idx !== index
    );
    setOriginImagesUrl(updatedOriginImagesUrl);

    const updatedRemovedOriginImageUrls = [
      ...removedOriginImageUrls,
      removedImageUrl,
    ];
    setRemovedOriginImageUrls(updatedRemovedOriginImageUrls);
  };

  //[기존 글 가져오기]
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (boardId) {
          const result = await getBoard(boardId);

          setTitle(result.title);
          setContent(result.content);

          if (result.fileList) {
            setOriginFiles(result.fileList.map((file: any) => file.fileName));
          }
          if (result.imageList) {
            setOriginImagesUrl(
              result.imageList.map((image: any) => image.imageUrl)
            );
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [boardId]);

  //[수정 하기]
  const handlePatchClick = async () => {
    try {
      if (boardId) {
        await patchBoard(
          boardId,
          title,
          content,
          files,
          removedOriginFiles,
          images,
          removedOriginImageUrls
        );
      }

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
        <Ul>
          {originFiles &&
            originFiles.map((fileName, index) => (
              <li key={`originFile-${index}`}>
                {fileName}
                <Remove onClick={() => handleOriginFileRemove(index)}>
                  &times;
                </Remove>
              </li>
            ))}
        </Ul>
        <Ul>
          {selectedFiles.map((fileName, index) => (
            <li key={index}>
              {fileName}
              <Remove onClick={() => handleFileRemove(index)}>&times;</Remove>
            </li>
          ))}
        </Ul>

        <TextField
          title="이미지"
          type="file"
          placeholder="이미지 파일을 올려주세요."
          onChange={handleImageUpload}
          multiple
        />
        <Ul>
          {originImagesUrl.map((imageUrl, index) => (
            <li key={index}>
              <ImgWrapper>
                <Image src={serverUrl + imageUrl} alt="Uploaded" />{" "}
                <ImgRemove onClick={() => handleOriginImageRemove(index)}>
                  {" "}
                  &times;
                </ImgRemove>
              </ImgWrapper>
            </li>
          ))}
        </Ul>
        <Ul>
          {selectedImageUrls.map((imageUrl, index) => (
            <ImgWrapper>
              <Image src={imageUrl} alt="Uploaded" />{" "}
              <ImgRemove onClick={() => handleImageRemove(index)}>
                {" "}
                &times;
              </ImgRemove>
            </ImgWrapper>
          ))}
        </Ul>
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
