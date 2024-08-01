import { Editor } from '@tiptap/react';
import { isTextSelection } from '@tiptap/core';

export const isTextSelected = ({
  editor: {
    isEditable,
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  },
}: {
  editor: Editor;
}): boolean => {
  // Sometime check for `empty` is not enough.
  // Doubleclick an empty paragraph returns a node size of 2.
  // So we check also for an empty text size.
  const isEmptyTextBlock =
    !doc.textBetween(from, to).length && isTextSelection(selection);

  return !empty && !isEmptyTextBlock && !!isEditable;
};
