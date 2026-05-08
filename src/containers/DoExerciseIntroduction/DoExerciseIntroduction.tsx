import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import Button, { EButtonStyleType } from '@/components/Button';
import { TRootState } from '@/redux/reducers';
import { EEmpty } from '@/common/enums';
import { Paths } from '@/routers/constants';

import { TDoExerciseIntroductionProps } from './DoExerciseIntroduction.types';

const DoExerciseIntroduction: React.FC<TDoExerciseIntroductionProps> = ({ onStart }) => {
  const myCourseLessonState = useSelector((state: TRootState) => state.courseReducer.getMyCourseLessonResponse)?.data;
  const totalQuestions = myCourseLessonState?.lesson?.questions?.length || EEmpty.ZERO;

  return (
    <div className="DoExerciseIntroduction flex items-center">
      <div className="DoExerciseIntroduction-wrapper ck-content">
        <h1>Xin Chào! 👋</h1>
        <br />
        <p>
          Chúc mừng bạn vừa hoàn thành bài học <strong>{myCourseLessonState?.lesson?.exercise?.name}</strong>.
          <br />
          Trước khi làm bài tập <strong>{myCourseLessonState?.lesson?.name}</strong>, hãy đảm bảo rằng bạn đã{' '}
          <strong>chuẩn bị và ghi nhớ đầy đủ kiến thức</strong> của bài học.
        </p>

        <br />
        <br />
        <p>🎉 Chúc bạn làm bài thật tốt !</p>
        <br />
        <br />

        <h3>Một số thứ cần lưu ý trước khi bắt đầu:</h3>
        <ul>
          <li>
            <p>
              Bài tập có tổng cộng <strong>{totalQuestions} câu hỏi</strong>.
            </p>
          </li>
          <li>
            <p>
              Bài tập <strong>không giới hạn thời gian</strong> nhưng hãy hoàn thành sớm nhất có thể. Hệ thống sẽ lưu
              lại thành tích của bạn.
            </p>
          </li>
          <li>
            <p>
              Kiểm tra lại các câu hỏi <strong>đã bỏ qua</strong>, câu hỏi <strong>khó</strong>.
            </p>
          </li>
          <li>
            <p>
              Kết quả bài tập sẽ được lưu trong mục{' '}
              <strong>
                <Link href={Paths.Exercises}>Bài Tập</Link>
              </strong>{' '}
              sau khi bạn nộp bài.
            </p>
          </li>
          <li>
            <p>
              Đối với bài là <strong>tự luận</strong>, bạn cần phải <strong>chờ giảng viên chấm bài</strong> rồi mới xem
              được kết quả.
            </p>
          </li>
        </ul>

        <br />
        <br />

        <div className="flex justify-center">
          <Button
            title="Bắt đầu làm bài"
            styleType={EButtonStyleType.PRIMARY}
            style={{ minWidth: '14rem' }}
            onClick={onStart}
          />
        </div>
      </div>
    </div>
  );
};

export default DoExerciseIntroduction;
