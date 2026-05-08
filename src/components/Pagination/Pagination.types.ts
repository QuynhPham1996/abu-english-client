export type TPaginationProps = {
  className?: string;
  page: number;
  pageSize: number;
  total?: number;
  showLessItems?: boolean;
  hideOnSinglePage?: boolean;
  onChange?: (page: number, pageSize?: number) => void;
};
