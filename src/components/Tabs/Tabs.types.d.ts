export type TTabsProps = {
  options?: TTabOption[];
  onKeyChange?: (key: string) => void;
};

export type TTabOption = {
  key: string;
  title: string;
  children: React.ReactNode;
};
