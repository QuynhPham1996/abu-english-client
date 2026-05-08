export type TCkEditorProps = {
  value?: string;
  toolbar?: { items: string[] };
  disabled?: boolean;
  onChange?: (data?: string) => void;
};
// [
//   'heading',
//   '|',
//   'fontSize',
//   'fontColor',
//   'fontBackgroundColor',
//   '|',
//   'bold',
//   'italic',
//   'underline',
//   'strikethrough',
//   '|',
//   'superscript',
//   'subscript',
//   '|',
//   'alignment',
//   'outdent',
//   'indent',
//   '|',
//   'bulletedList',
//   'numberedList',
//   '|',
//   'undo',
//   'redo',
//   '-',
//   'style',
//   '|',
//   'imageUpload',
//   'imageInsert',
//   'mediaEmbed',
//   '|',
//   'insertTable',
//   'link',
//   'blockQuote',
//   'specialCharacters',
//   'horizontalLine',
//   'htmlEmbed',
//   'codeBlock',
//   '|',
//   'highlight',
//   'findAndReplace'
// ]
