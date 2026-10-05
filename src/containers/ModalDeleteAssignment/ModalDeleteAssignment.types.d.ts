import { TAssignment } from '@/common/models';

export type TModalDeleteAssignmentProps = {
  visible: boolean;
  data?: TAssignment;
  onClose?: () => void;
  onSuccess?: () => void;
};
