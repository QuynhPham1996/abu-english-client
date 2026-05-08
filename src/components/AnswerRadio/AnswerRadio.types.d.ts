export type TAnswerRadioProps = {
  value?: TAnswerRadioOption;
  options?: TAnswerRadioOption[];
  disabled?: boolean;
  onChange?: (data: TAnswerRadioOption) => void;
};

export type TAnswerRadioOption = {
  label: React.ReactNode;
  value: string;
  data?: any;
  incorrect?: boolean;
  correct?: boolean;
};
