export type TUploadProps = {
  className?: string;
  value?: any;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (data: FileList | null) => void;
};
