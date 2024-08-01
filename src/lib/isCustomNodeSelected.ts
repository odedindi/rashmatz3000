import { Editor } from '@tiptap/react';

import ImageBlock from '@/components/editors/tiptap/extensions/ImageBlock';
import Figcaption from '@/components/editors/tiptap/extensions/Figcaption';
import ImageUpload from '@/components/editors/tiptap/extensions/ImageUpload';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector('a.grip-column.selected');
  const gripRow =
    container &&
    container.querySelector &&
    container.querySelector('a.grip-row.selected');

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    ImageBlock.name,
    ImageUpload.name,
    CodeBlock.name,

    Link.name,
    Figcaption.name,
  ];

  return (
    customNodes.some((type) => editor.isActive(type)) ||
    isTableGripSelected(node)
  );
};

export default isCustomNodeSelected;
