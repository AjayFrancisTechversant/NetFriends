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
