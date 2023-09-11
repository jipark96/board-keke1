export interface BoardListData {
  id: number;
  title: string;
  username: string;
  createdAt: string;
  view: number;
  likeCount: number;
  commentList?: {
    id: number;
    boardId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
    parentCommentId?: number | null;
    replies?: Array<string>;
  }[];
}

export interface BoardDetailData {
  id?: number;
  title?: string;
  content?: string;
  username?: string;
  createdAt?: string;
  view?: number;
  likeCount: number;
  commentList?: {
    id: number;
    boardId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
    parentCommentId: number | null;
  }[];
  fileList?: {
    fileId: number;
    fileName: string;
    filePath: string;
  }[];
  imageList?: {
    id: number;
    imageUrl: string;
    imageName: string;
  }[];
}

export interface CommentData {
  commentList: {
    id: number;
    boardId: number;
    userId: number;
    username: string;
    content: string;
    createdAt: string;
    parentCommentId: number | null;
  }[];
}
