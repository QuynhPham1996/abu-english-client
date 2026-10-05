import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Empty from '@/components/Empty';
import ExerciseCard from '@/components/ExerciseCard';
import LessonCard from '@/components/LessonCard';
import { Paths } from '@/routers/constants';
import { EEmpty } from '@/common/enums';
import { TUserExercises, TUserLessons } from '@/common/models';

import { TTableContentExerciseProps } from './TableContentExercise.types.d';

const TableContentExercise: React.FC<TTableContentExerciseProps> = ({
  showBadge = true,
  showLessons = false,
  collapsibleLessons = false,
  gradedLessonIds = [],
  getLessonDescription,
  activeId,
  userExercises = [],
  userLessons = [],
}) => {
  const router = useRouter();
  const [collapsedIds, setCollapsedIds] = useState<string[]>([]);
  const isEmptyExercises = userExercises?.length === 0;
  const gradedIds = new Set(gradedLessonIds);
  const isLessonDone = (userLesson?: TUserLessons): boolean =>
    Boolean(userLesson?.isPass) || gradedIds.has(userLesson?.lesson?.id || '');
  const doneNames = new Set(
    userLessons.filter((userLesson) => isLessonDone(userLesson)).map((userLesson) => userLesson?.lesson?.name).filter(Boolean),
  );

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
            const isLock = activeIndex !== -1 && subItemIndex > activeIndex;
            const canToggleLessons = collapsibleLessons && showLessons && lessonsIncludeExercise.length > 0;
            const isExpanded = !collapsedIds.includes(subItem.id);

            return (
              <React.Fragment key={subItem.id}>
                <ExerciseCard
                  numberIndex={subItemIndex + 1}
                  percent={percent}
                  badgeTitle={showBadge && isActive ? 'Học ngay' : undefined}
                  locked={isLock}
                  active={activeId ? isActiveId : isActive}
                  expanded={isExpanded}
                  onToggle={
                    canToggleLessons
                      ? (): void => {
                          setCollapsedIds((current) =>
                            current.includes(subItem.id)
                              ? current.filter((item) => item !== subItem.id)
                              : [...current, subItem.id],
                          );
                        }
                      : undefined
                  }
                  onClick={(): void => {
                    if (!isLock) {
                      router.push(Paths.LearnDetail(subItem.id));
                    }
                  }}
                  {...subItem?.exercise}
                />
                {showLessons && isExpanded && !!lessonsIncludeExercise.length && (
                  <div className="TableContentExercise-lessons">
                    {lessonsIncludeExercise.map((userLesson) => (
                      <LessonCard
                        key={userLesson.id}
                        name={userLesson?.lesson?.name}
                        type={userLesson?.lesson?.type}
                        description={getLessonDescription?.(userLesson) || 'Bài tập của bài học'}
                        completed={isLessonDone(userLesson) || doneNames.has(userLesson?.lesson?.name)}
                        onClick={(): void => {
                          if (!isLock) {
                            router.push(Paths.DoExercise(userLesson.id));
                          }
                        }}
                      />
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TableContentExercise;
