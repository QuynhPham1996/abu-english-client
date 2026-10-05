import { EIconName } from '@/components/Icon';
import { Paths } from '@/routers/constants';

export const dataHeaderMenu = (data?: any) => {
  return [
    {
      key: 'learn',
      title: 'Học Bài',
      icon: EIconName.Book,
      link: Paths.Learn,
      activePaths: [Paths.Learn, Paths.LearnDetail(data?.id), Paths.DoExercise(data?.id)],
      hide: data?.isAdmin,
    },
    {
      key: 'exercise',
      title: 'Bài Tập',
      icon: EIconName.NoteBook,
      link: Paths.Exercises,
      activePaths: [Paths.Exercises, Paths.ExerciseDetail(data?.id)],
      hide: data?.isAdmin,
    },
    {
      key: 'courses',
      title: 'Khoá Học',
      icon: EIconName.Books,
      badge: 'Mới',
      link: Paths.Courses,
      activePaths: [Paths.Courses],
      hide: data?.isAdmin,
    },
    {
      key: 'users-management',
      title: 'Quản Lý Người Dùng',
      icon: EIconName.Users,
      link: Paths.UsersManagement,
      activePaths: [Paths.UsersManagement],
      hide: !data?.isAdmin,
    },
    {
      key: 'courses-management',
      title: 'Quản Lý Khoá Học',
      icon: EIconName.Books,
      link: Paths.CoursesManagement,
      activePaths: [
        Paths.CoursesManagement,
        Paths.CourseDetailManagement(data?.id),
        Paths.CourseDetailExerciseManagement(data?.id, data?.exerciseId),
      ],
      hide: !data?.isAdmin,
    },
    {
      key: 'assignments-management',
      title: 'Thư Viện Bài Tập',
      icon: EIconName.ClipboardText,
      link: Paths.AssignmentsManagement,
      activePaths: [Paths.AssignmentsManagement, Paths.AssignmentDetailManagement(data?.id)],
      hide: !data?.isAdmin,
    },
    {
      key: 'questions-bank-management',
      title: 'Ngân Hàng Câu Hỏi',
      icon: EIconName.Help,
      link: Paths.QuestionsBankManagement,
      activePaths: [Paths.QuestionsBankManagement],
      hide: !data?.isAdmin,
    },
    {
      key: 'question-groups-management',
      title: 'Nhóm Câu Hỏi',
      icon: EIconName.UsersGroup,
      link: Paths.QuestionGroupsManagement,
      activePaths: [Paths.QuestionGroupsManagement, Paths.QuestionGroupDetailManagement(data?.id)],
      hide: !data?.isAdmin,
    },
    {
      key: 'exercises-management',
      title: 'Chấm Bài',
      icon: EIconName.NoteBook,
      link: Paths.ExercisesManagement,
      activePaths: [Paths.ExercisesManagement, Paths.ExerciseDetail(data?.id)],
      hide: !data?.isAdmin,
    },
  ];
};
