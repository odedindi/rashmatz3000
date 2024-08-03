'use client';

import { useEditor, EditorContent, Content } from '@tiptap/react';
import { baseExtensions } from './extensions/baseExtensions';
import { FC, useRef } from 'react';

import { EditorInfo } from './components/editor-info';
import { LinkMenu, TextMenu } from './components/menus';
import ColumnsMenu from './extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from './extensions/Table/menus';
import EditorToolbar from './components/editor-toolbar';

import './styles.css';

const RichTextEditor: FC<{
  value: Content;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'min-h-[150px] max-h-[screen] h-auto w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto',
      },
    },
    extensions: baseExtensions,
    content: value, // Set the initial content with the provided value
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Call the onChange callback with the updated HTML content
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  if (!editor) return null;

  return (
    <div ref={wrapperRef}>
      <EditorToolbar editor={editor} />

      <EditorInfo
        characters={characterCount.characters()}
        words={characterCount.words()}
        className="justify-end py-4"
      />
      <EditorContent editor={editor} />

      <LinkMenu editor={editor} appendTo={wrapperRef} />
      <TextMenu editor={editor} />
      <ColumnsMenu editor={editor} appendTo={wrapperRef} />
      <TableRowMenu editor={editor} appendTo={wrapperRef} />
      <TableColumnMenu editor={editor} appendTo={wrapperRef} />

      <EditorInfo
        characters={characterCount.characters()}
        words={characterCount.words()}
        className="justify-end py-4"
      />
    </div>
  );
};

export default RichTextEditor;
