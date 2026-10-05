export const LayoutPaths = {};

export const ModulePaths = {};

export const Paths = {
  Home: '/',
  Login: '/login',
  RoleNavigate: '/role-navigate',
  Learn: '/learn',
  LearnDetail: (id?: string): string => `/learn/${id || ':id'}`,
  Courses: '/courses',
  Exercises: '/exercises',
  ExerciseDetail: (id?: string): string => `/exercises/${id || ':id'}`,
  DoExercise: (id?: string): string => `/do-exercise/${id || ':id'}`,
  Profile: '/profile',
  UsersManagement: '/users-management',
  CoursesManagement: '/courses-management',
  ExercisesManagement: '/exercises-management',
  QuestionGroupsManagement: '/question-groups-management',
  QuestionGroupDetailManagement: (id?: string): string => `/question-groups-management/${id || ':id'}`,
  QuestionsBankManagement: '/questions-bank-management',
  AssignmentsManagement: '/assignments-management',
  AssignmentDetailManagement: (id?: string): string => `/assignments-management/${id || ':id'}`,
  CourseDetailManagement: (id?: string): string => `/courses-management/${id || ':id'}`,
  CourseDetailExerciseManagement: (id?: string, exerciseId?: string): string =>
    `/courses-management/${id || ':id'}/exercise/${exerciseId || ':exerciseId'}`,
  LessonPreview: (id?: string, exerciseId?: string, lessonId?: string): string => {
    const path = `/courses-management/${id || ':id'}/exercise/${exerciseId || ':exerciseId'}/preview`;
    return lessonId ? `${path}?lesson=${lessonId}` : path;
  },
  AssignmentPreview: (id?: string): string => `/assignments-management/${id || ':id'}/preview`,
};
