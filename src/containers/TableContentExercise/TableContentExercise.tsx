import React from 'react';
import { useRouter } from 'next/router';

import Empty from '@/components/Empty';
import ExerciseCard from '@/components/ExerciseCard';
import { Paths } from '@/routers/constants';
import { EEmpty } from '@/common/enums';
import { TUserExercises, TUserLessons } from '@/common/models';

import { TTableContentExerciseProps } from './TableContentExercise.types.d';

const TableContentExercise: React.FC<TTableContentExerciseProps> = ({
  showBadge = true,
  activeId,
  userExercises = [],
  userLessons = [],
}) => {
  const router = useRouter();
  const isEmptyExercises = userExercises?.length === 0;

  const getUserLessonsFromExercise = (userExercise: TUserExercises): TUserLessons[] => {
    return (
      userLessons?.filter(
        (userLesson) => userExercise?.exercise?.lessons?.map((lesson) => lesson.id)?.includes(userLesson?.lesson?.id),
      ) || []
    );
  };

  return (
    <div className="TableContentExercise">
      {isEmptyExercises ? (
        <div className="Learn-courses-body">
          <Empty />
        </div>
      ) : (
        <div className="Learn-courses-body">
          {userExercises?.map((subItem, subItemIndex) => {
            const lessonsIncludeExercise = getUserLessonsFromExercise(subItem);
            const totalLessonsIncludeExercise = Number(lessonsIncludeExercise?.length || EEmpty.ZERO);
            const totalLessonsIncludeExerciseCompleted = Number(
              lessonsIncludeExercise?.filter((userLesson) => userLesson.isPass)?.length || EEmpty.ZERO,
            );

            const exercisePercent = subItem.isPass ? 100 : 0;

            const lessonRatio = totalLessonsIncludeExercise > 0 ? 100 / totalLessonsIncludeExercise : 0;
            const lessonPercent = totalLessonsIncludeExerciseCompleted * lessonRatio;

            const percent = Math.floor((exercisePercent + lessonPercent) / 2);

            const activeIndex = userExercises?.findIndex((userExercise) => {
              const isAtLeastOneLessonNotCompleted = getUserLessonsFromExercise(userExercise)?.some(
                (subItem) => !subItem.isPass,
              );

              return !userExercise.isPass || (userExercise.isPass && isAtLeastOneLessonNotCompleted);
            });

            const isActive = activeIndex === subItemIndex;
            const isActiveId = activeId === subItem?.id;
            const isLock = subItemIndex > activeIndex;

            return (
              <ExerciseCard
                key={subItem.id}
                numberIndex={subItemIndex + 1}
                percent={percent}
                badgeTitle={showBadge && isActive ? 'Học ngay' : undefined}
                locked={isLock}
                active={activeId ? isActiveId : isActive}
                onClick={(): void => {
                  if (!isLock) {
                    router.push(Paths.LearnDetail(subItem.id));
                  }
                }}
                {...subItem?.exercise}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TableContentExercise;
