export interface backgroundImgUrlProps {
  $backgroundImageUrl: string;
}

export interface SignUpInputRule {
  rule: RegExp;
  message: string;
}

export interface SignUpFormState {
  email: string;
  userName: string;
  password: string;
}

export interface ProductData {
  bottler: string;
  caskType: string;
  distillery: string;
  picture: string;
  size: string;
  strength: string;
  title: string;
  productUid: string;
  introText: string;
}

export interface WheelData {
  name: string;
  value?: number;
  children?: WheelData[];
  current?: any;
}

export interface CommentData {
  authorUid: string;
  commentText: string;
  productUid: string;
  authorName: string;
  wheelData: WheelData | WheelData[];
}

export interface NodeWheelBounds {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  current?: {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  };
  target?: {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  };
}

export interface TreeNode {
  id: number;
  name: string;
  value: number;
  children?: TreeNode[];
}

export interface TreeNodeProps {
  data: TreeNode;
}

export interface UserProfileData {
  userUid: string;
  userName: string;
  email: string;
  organizedEvents: (string | null)[];
  attendedEvents: (string | null)[];
}

export interface UserEventsData {
  coverImage: string;
  date: string;
  eventUid: string;
  location: string;
  maxParticipants: number;
  organizerUid: string;
  participantsUid: (string | null)[];
  tags: (string | null)[];
  text: string;
  title: string;
  time: string;
}

export interface EventData {
  coverImage: string;
  date: string;
  eventUid: string;
  location: string;
  maxParticipants: number;
  organizerUid: string;
  participantsUid: (string | null)[];
  text: string;
  title: string;
  time: string;
  tags: (string | null)[];
}

export interface EditEventFormProps {
  eventId?: string;
  initTitle?: string;
  initLocation?: string;
  initParticipants?: number;
  initText?: string;
  initDate?: string;
  initTime?: string;
  onFormClose?: () => void;
}

export interface ArticleData {
  picture: string;
  text: string;
  title: string;
  tags: (string | null)[];
  articleUid: string;
}

export interface ProductsData {
  bottler: string;
  caskType: string;
  distillery: string;
  picture: string;
  size: string;
  strength: string;
  title: string;
  productUid: string;
  introText: string;
}
