export type TUser = {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  courses: TCourse[];
  userExercises?: TUserExercises[];
  userLessons?: TUserLessons[];
};

export type TUploadFile = {
  type: string;
  mimetype: string;
  originalname: string;
  filename: string;
  url: string;
};

export type TNotification = {
  data: any;
  fromUser: TUser;
  toUser: TUser;
  createdAt: string;
  id: string;
  isRead: string;
  message: string;
  type: string;
  updatedAt: string;
};

export type TCourse = {
  id: string;
  name: string;
  description: string;
  image: string;
  level: string;
  retailPrice: number;
  sellingPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  manager: TUser;
  userLessons: TUserLessons[];
  userExercises: TUserExercises[];
};

export type TExercise = {
  course: TCourse;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  status: string;
  videoUrl: string;
  videoDuration: number;
  updatedAt: string;
  lesson: string;
  answers: TAnswer[];
  lessons: TLesson[];
};

export type TLesson = {
  id: string;
  name: string;
  type: string;
  arrange: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  questions: TQuestion[];
  exercise: TExercise;
};

export type TQuestion = {
  id: string;
  question: string;
  answers?: TAnswer[];
  lesson: TLesson;
  index: number;
  note: string;
};

export type TAnswer = {
  id: string;
  title: string;
  isCorrect: boolean;
};

export type TUserExercises = {
  id: string;
  isPass: boolean;
  exercise: TExercise;
};

export type TUserLessons = {
  id: string;
  isPass: boolean;
  lesson: TLesson;
};

export type TTest = {
  createdAt: string;
  id: string;
  status: string;
  updatedAt: string;
  lesson: TLesson;
  duration: number;
  result: number;
  user: TUser;
  userLesson: TUserLessons;
  userExercise: TUserExercises;
  userAnswers: TUserAnswer[];
};

export type TUserAnswer = {
  question: string;
  answer: string;
  isCorrect?: boolean;
  note?: string;
};
