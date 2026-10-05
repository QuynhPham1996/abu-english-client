import { TAssignment } from '@/common/models';

export type TModalAssignmentFormProps = {
  visible: boolean;
  data?: TAssignment;
  onClose?: () => void;
  onSuccess?: (created?: boolean) => void;
};
