export type TModalPickAssignmentsProps = {
  visible: boolean;
  exerciseId?: string;
  courseId?: string;
  attachedSourceIds?: string[];
  attachedNames?: string[];
  onClose?: () => void;
  onSuccess?: () => void;
};
