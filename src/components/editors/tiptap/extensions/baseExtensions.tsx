import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap';

import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Link from '@tiptap/extension-link';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';

import StarterKit from '@tiptap/starter-kit';

import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import Focus from '@tiptap/extension-focus';
import CharacterCount from '@tiptap/extension-character-count';
import Figcaption from './Figcaption';
import { FontSize } from './FontSize';

export const baseExtensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({
    HTMLAttributes: {
      types: [ListItem.name],
    },
  }),
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal pl-4',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc pl-4',
      },
    },
  }),
  Underline,
  Highlight.configure({ multicolor: true }),
  Superscript,
  Subscript,
  Link,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Image,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  FontFamily,
  Focus.configure({
    className: 'has-focus',
    mode: 'all',
  }),
  ListKeymap,
  CharacterCount,
  Figcaption,
  FontSize,
];
