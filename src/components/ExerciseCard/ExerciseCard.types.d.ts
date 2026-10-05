export type TExerciseCardProps = {
  locked?: boolean;
  active?: boolean;
  numberIndex?: number;
  badgeTitle?: string;
  percent?: number;
  name?: string;
  description?: string;
  expanded?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
};
