import { TUser } from '@/common/models';

export type TCourseCardProps = {
  name?: string;
  description?: string;
  image?: string;
  sellingPrice?: number;
  retailPrice?: number;
  manager?: TUser;
  level?: string;
  status?: string;
  totalExercises?: number;
  totalDurations?: number;
  totalUsers?: number;
  onRegister?: () => void;
};
