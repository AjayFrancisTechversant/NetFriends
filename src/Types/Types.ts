export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type ScreenContextType = {
  windowHeight: number;
  windowWidth: number;
  isPortrait: boolean;
  windowScale: number;
  windowFontScale: number;
  isTypeTablet: boolean;
};

export type NativeEventType = {
  nativeEvent: {
    contentInset?: {bottom: number; left: number; right: number; top: number};
    contentOffset?: {x: number; y: number};
    contentSize?: {height: number; width: number};
    layoutMeasurement?: {height: number; width: number};
    zoomScale?: number;
  };
};

export type NewCommentDetailsType = {
  postId: string | undefined;
  userId: string | undefined;
  body: string;
};
export type UpdatingCommentDetailsType = {
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

export type UserType = {
  cell: string;
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  };
  location: {
    city: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    country: string;
    postcode: string;
    state: string;
    street: {
      name: string;
      number: number;
    };
    timezone: {
      description: string;
      offset: string;
    };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: string;
  };
};
