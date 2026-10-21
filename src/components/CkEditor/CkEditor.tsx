import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { questionHasHtml } from '@/utils/question';

import CkEditorAdapter from './CkEditorAdapter';
import { TCkEditorProps } from './CkEditor.types';

const toEditorHtml = (value?: string): string => {
  const source = value || '';
  if (!source.trim()) return '';
  if (questionHasHtml(source)) return source;

  return source
    .split(/\n{2,}/)
    .map((block) => {
      const safe = block
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
      return `<p>${safe || '<br>'}</p>`;
    })
    .join('');
};

export const CkEditor: React.FC<TCkEditorProps> = ({ value, toolbar, disabled, onChange }) => {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const editorHtml = toEditorHtml(value);

  function customCkEditorAdapter(editor: any): any {
    // eslint-disable-next-line no-param-reassign
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any): any => {
      return new CkEditorAdapter(loader);
    };
  }

  const config = {
    removePlugins: ['Title'],
    placeholder: 'Nhập nội dung tại đây...',
    extraPlugins: [customCkEditorAdapter],
  };

  const handleEditorChange = (event: any, editor: any): void => {
    const data = editor.getData();
    if (!data || data === editorHtml) return;
    onChange?.(data);
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('ckeditor5-build/build/ckeditor'),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <div className={classNames('CkEditor', { disabled })}>
      <CKEditor
        placeholder="Nhập Nội Dung"
        config={
          toolbar
            ? {
                toolbar,
                ...config,
              }
            : config
        }
        editor={ClassicEditor}
        data={editorHtml}
        onChange={handleEditorChange}
        onError={(): void => undefined}
      />
    </div>
  ) : (
    <></>
  );
};

export default CkEditor;
