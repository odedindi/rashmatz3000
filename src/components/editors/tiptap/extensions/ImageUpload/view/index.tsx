import { Editor, NodeViewWrapper } from '@tiptap/react';
import { FC, useCallback } from 'react';

import { ImageUploader } from './ImageUploader';

export const ImageUpload: FC<{
  getPos: () => number;
  editor: Editor;
}> = ({ getPos, editor }) => {
  const onUpload = useCallback(
    (url: string) => {
      if (url) {
        editor
          .chain()
          .setImageBlock({ src: url })
          .deleteRange({ from: getPos(), to: getPos() })
          .focus()
          .run();
      }
    },
    [getPos, editor]
  );

  return (
    <NodeViewWrapper>
      <div className="m-0 p-0" data-drag-handle>
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};

export default ImageUpload;
