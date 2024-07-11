export type setStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type ScreenContextType = {
  windowHeight: number;
  windowWidth: number;
  isPortrait: boolean;
  windowScale: number;
  windowFontScale: number;
  isTypeTablet: boolean;
};

export type NewCommentDetailsType = {
  postId: string | undefined;
  userId: string | undefined;
  body: string;
};
export type updatingMessageDetailsType = {
  id: number | undefined;
  editedBody: string;
};

export type CommentItemType = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};
