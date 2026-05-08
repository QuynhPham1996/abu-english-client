import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import CkEditorAdapter from './CkEditorAdapter';
import { TCkEditorProps } from './CkEditor.types';

export const CkEditor: React.FC<TCkEditorProps> = ({ value, toolbar, disabled, onChange }) => {
  const editorRef = useRef<any>();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

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

  const handleEditorChange = async (event: any, editor: any): Promise<void> => {
    const data = await editor.getData();
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
        data={value || ''}
        onChange={handleEditorChange}
      />
    </div>
  ) : (
    <></>
  );
};

export default CkEditor;
