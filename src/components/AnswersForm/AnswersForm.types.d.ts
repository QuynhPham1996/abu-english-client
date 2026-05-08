import { TAnswer } from '@/common/models';

export type TAnswersFormProps = {
  value?: TAnswer[];
  onChange?: (data: TAnswer[]) => void;
};
