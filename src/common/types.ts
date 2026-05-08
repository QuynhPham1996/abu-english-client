export type TCommonPaginate = {
  paginate: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export type TDropdownGroupMenuData = {
  id: string | number;
  title?: string;
  danger?: boolean;
  active?: boolean;
  disabled?: boolean;
  hide?: boolean;
  data?: TDropdownGroupMenuData[];
  onClick?: () => void;
};
