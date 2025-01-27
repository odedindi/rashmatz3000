'use client';
import { type FC, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Content } from '@tiptap/react';
import dynamic from 'next/dynamic';

const PlainTextEditor = dynamic(
  () => import('@/components/editors/plain-text-editor'),
  { ssr: false }
);
const RichTextEditor = dynamic(
  () => import('@/components/editors/tiptap/text-editor'),
  { ssr: false }
);

const NewTaskPage: FC = () => {
  const [editorMode, setEditorMode] = useState<'richText' | 'textares'>(
    'richText'
  );
  const [value, setValue] = useState<Content>('');
  return (
    <div className="p-4">
      New Task Page
      <div className="my-4 flex items-center space-x-2">
        <Label htmlFor="airplane-mode">Editor Mode</Label>
        <Switch
          checked={editorMode === 'richText'}
          onCheckedChange={(checked) =>
            setEditorMode(checked ? 'richText' : 'textares')
          }
        />
      </div>
      {editorMode === 'textares' ? (
        <PlainTextEditor
          value={value?.toString()}
          onChange={({ target: { value } }) => {
            console.log({ value });
            setValue(value);
          }}
        />
      ) : (
        <RichTextEditor
          value={value}
          onChange={(value) => {
            console.log({ value });
            setValue(value);
          }}
        />
      )}
    </div>
  );
};

export default NewTaskPage;
