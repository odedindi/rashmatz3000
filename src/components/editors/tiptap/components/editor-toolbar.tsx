import { type FC, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Text,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ListOrdered,
  Quote,
  Underline as UnderlineIcon,
  Redo,
  Undo,
  List,
  Highlighter,
  SuperscriptIcon,
  SubscriptIcon,
  Link2Icon,
  Minus,
  WrapText,
  ListTodo,
  ListEnd,
  ListStart,
  LayoutList,
  ImageIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignJustify,
  Undo2,
  Palette,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import EditorToolbarItem from './editor-toolbar-item';

import type { Editor } from '@tiptap/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTextmenuStates } from './menus/TextMenu/hooks/useTextmenuStates';
import { Surface } from '@/components/ui/surface';
import { ColorPicker } from './panels';

const MemoColorPicker = memo(ColorPicker);

const EditorToolbar: FC<{ editor: Editor }> = ({ editor }) => {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const href = window.prompt('URL', previousUrl);

    // cancelled
    if (href === null) return;

    // if href empty unset link, else set link
    href === ''
      ? editor.chain().focus().extendMarkRange('link').unsetLink().run()
      : editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL');

    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const states = useTextmenuStates(editor);

  if (!editor) return null;

  return (
    <div className="flex flex-row flex-wrap items-center gap-1 py-4">
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleBold().run}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        active={editor.isActive('bold') ? 1 : 0}
        title="Bold"
      >
        <Bold />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleItalic().run}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        active={editor.isActive('italic') ? 1 : 0}
        title="Italic"
      >
        <Italic />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleUnderline().run}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        active={editor.isActive('underline') ? 1 : 0}
        title="Underline"
      >
        <UnderlineIcon />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleStrike().run}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        active={editor.isActive('strike') ? 1 : 0}
        title="Strike through"
      >
        <Strikethrough />
      </EditorToolbarItem>

      <EditorToolbarItem
        onClick={editor.chain().focus().toggleSubscript().run}
        disabled={!editor.can().chain().focus().toggleSubscript().run()}
        active={editor.isActive('subscript') ? 1 : 0}
        title="Subscript"
      >
        <SubscriptIcon />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleSuperscript().run}
        disabled={!editor.can().chain().focus().toggleSuperscript().run()}
        active={editor.isActive('superscript') ? 1 : 0}
        title="Superscript"
      >
        <SuperscriptIcon />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleCode().run}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        active={editor.isActive('code') ? 1 : 0}
        title="Code"
      >
        <Code />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().unsetAllMarks().run}
        title="Clear Marks"
      >
        Clear marks
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().clearNodes().run}
        title="Clear Nodes"
      >
        Clear nodes
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().setParagraph().run}
        disabled={editor.isActive('paragraph')}
        active={editor.isActive('paragraph') ? 1 : 0}
        title="Paragraph"
      >
        <Text />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHeading({ level: 1 }).run}
        disabled={editor.isActive('heading', { level: 1 })}
        active={editor.isActive('heading', { level: 1 }) ? 1 : 0}
        title="H1"
      >
        <Heading1 />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHeading({ level: 2 }).run}
        active={editor.isActive('heading', { level: 2 }) ? 1 : 0}
        title="H2"
      >
        <Heading2 />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHeading({ level: 3 }).run}
        active={editor.isActive('heading', { level: 3 }) ? 1 : 0}
        title="H3"
      >
        <Heading3 />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHeading({ level: 4 }).run}
        active={editor.isActive('heading', { level: 4 }) ? 1 : 0}
        title="H4"
      >
        <Heading4 />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHeading({ level: 5 }).run}
        active={editor.isActive('heading', { level: 5 }) ? 1 : 0}
        title="H5"
      >
        <Heading5 />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHeading({ level: 6 }).run}
        active={editor.isActive('heading', { level: 6 }) ? 1 : 0}
        title="H6"
      >
        <Heading6 />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={setLink}
        active={editor.isActive('link') ? 1 : 0}
        title="Link"
      >
        <Link2Icon />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleBulletList().run}
        active={editor.isActive('bulletList') ? 1 : 0}
        title="Bullet List"
      >
        <List />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleOrderedList().run}
        active={editor.isActive('orderedList') ? 1 : 0}
        title="Ordered List"
      >
        <ListOrdered />
      </EditorToolbarItem>

      <EditorToolbarItem
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        active={editor.isActive('taskList') ? 1 : 0}
        title="Toggle task list"
      >
        <ListTodo />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={() => editor.chain().focus().splitListItem('taskItem').run()}
        disabled={!editor.can().splitListItem('taskItem')}
        title="Split list item"
      >
        <LayoutList />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={() => editor.chain().focus().sinkListItem('taskItem').run()}
        disabled={!editor.can().sinkListItem('taskItem')}
        title="Sink list item"
      >
        <ListEnd />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={() => editor.chain().focus().liftListItem('taskItem').run()}
        disabled={!editor.can().liftListItem('taskItem')}
        title="Lift list item"
      >
        <ListStart />
      </EditorToolbarItem>

      <EditorToolbarItem
        onClick={editor.chain().focus().toggleCodeBlock().run}
        active={editor.isActive('codeBlock') ? 1 : 0}
        title="Code block"
      >
        Code block
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().toggleBlockquote().run}
        active={editor.isActive('blockquote') ? 1 : 0}
        title="Blockquote"
      >
        <Quote />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().setHorizontalRule().run}
        title="Horizontal Rule"
      >
        <Minus />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().setHardBreak().run}
        title="Hard break"
      >
        <WrapText />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().undo().run}
        disabled={!editor.can().chain().focus().undo().run()}
        title="Undo"
      >
        <Undo />
      </EditorToolbarItem>
      <EditorToolbarItem
        onClick={editor.chain().focus().redo().run}
        disabled={!editor.can().chain().focus().redo().run()}
        title="Redo"
      >
        <Redo />
      </EditorToolbarItem>
      <EditorToolbarItem onClick={addImage} title="Set image">
        <ImageIcon />
      </EditorToolbarItem>

      <EditorToolbarItem
        onClick={editor.chain().focus().toggleHighlight().run}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        active={editor.isActive('highlight') ? 1 : 0}
        title="Highlight"
      >
        <Highlighter />
      </EditorToolbarItem>
      <Popover>
        <PopoverTrigger asChild>
          <EditorToolbarItem title="Set text color">
            <Palette />
            {states.currentHighlight}
          </EditorToolbarItem>
        </PopoverTrigger>
        <PopoverContent>
          <Surface className="rounded p-1">
            <MemoColorPicker
              color={editor.getAttributes('textStyle').color}
              onChange={(color) => editor.chain().focus().setColor(color).run()}
              onClear={() => editor.chain().focus().unsetColor().run()}
            />
          </Surface>
        </PopoverContent>
      </Popover>

      <Accordion
        type="single"
        collapsible
        className="w-full bg-background/90 px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Table</AccordionTrigger>
          <AccordionContent className="flex w-full flex-wrap justify-start gap-2 bg-slate-200 p-2">
            <EditorToolbarItem
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
            >
              Insert table
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              Add column before
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              Add column after
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().deleteColumn().run()}
            >
              Delete column
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().addRowBefore().run()}
            >
              Add row before
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().addRowAfter().run()}
            >
              Add row after
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().deleteRow().run()}
            >
              Delete row
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().deleteTable().run()}
            >
              Delete table
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().mergeCells().run()}
            >
              Merge cells
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().splitCell().run()}
            >
              Split cell
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
            >
              Toggle header column
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            >
              Toggle header row
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              Toggle header cell
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().mergeOrSplit().run()}
            >
              Merge or split
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() =>
                editor.chain().focus().setCellAttribute('colspan', 2).run()
              }
            >
              Set cell attribute
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().fixTables().run()}
            >
              Fix tables
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().goToNextCell().run()}
            >
              Go to next cell
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().goToPreviousCell().run()}
            >
              Go to previous cell
            </EditorToolbarItem>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Text Alignment</AccordionTrigger>
          <AccordionContent className="flex w-full flex-wrap justify-start gap-2 bg-slate-200 p-2">
            <EditorToolbarItem
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              active={editor.isActive({ textAlign: 'left' }) ? 1 : 0}
              title='Align text to "left"'
            >
              <AlignLeft />
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              active={editor.isActive({ textAlign: 'center' }) ? 1 : 0}
              title='Align text to "center"'
            >
              <AlignCenter />
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              active={editor.isActive({ textAlign: 'right' }) ? 1 : 0}
              title='Align text to "right"'
            >
              <AlignRight />
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() =>
                editor.chain().focus().setTextAlign('justify').run()
              }
              active={editor.isActive({ textAlign: 'justify' }) ? 1 : 0}
              title='Align text to "justify"'
            >
              <AlignJustify />
            </EditorToolbarItem>
            <EditorToolbarItem
              onClick={() => editor.chain().focus().unsetTextAlign().run()}
              title="Unset text alignment"
            >
              <Undo2 />
            </EditorToolbarItem>

            <DropdownMenu>
              {/* better refactor to a Select */}
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select Font Family</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setFontFamily('Inter').run()
                  }
                  className={
                    editor.isActive('textStyle', { fontFamily: 'Inter' })
                      ? 'is-active'
                      : ''
                  }
                  data-test-id="inter"
                >
                  Inter
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setFontFamily('Comic Sans MS, Comic Sans')
                      .run()
                  }
                  className={
                    editor.isActive('textStyle', {
                      fontFamily: 'Comic Sans MS, Comic Sans',
                    })
                      ? 'is-active'
                      : ''
                  }
                  data-test-id="comic-sans"
                >
                  Comic Sans
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setFontFamily('serif').run()
                  }
                  className={
                    editor.isActive('textStyle', { fontFamily: 'serif' })
                      ? 'is-active'
                      : ''
                  }
                  data-test-id="serif"
                >
                  Serif
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setFontFamily('monospace').run()
                  }
                  className={
                    editor.isActive('textStyle', { fontFamily: 'monospace' })
                      ? 'is-active'
                      : ''
                  }
                  data-test-id="monospace"
                >
                  Monospace{' '}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor.chain().focus().setFontFamily('cursive').run()
                  }
                  className={
                    editor.isActive('textStyle', { fontFamily: 'cursive' })
                      ? 'is-active'
                      : ''
                  }
                  data-test-id="cursive"
                >
                  Cursive
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setFontFamily('var(--title-font-family)')
                      .run()
                  }
                  className={
                    editor.isActive('textStyle', {
                      fontFamily: 'var(--title-font-family)',
                    })
                      ? 'is-active'
                      : ''
                  }
                  data-test-id="css-variable"
                >
                  CSS variable
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .setFontFamily('"Comic Sans MS", "Comic Sans"')
                      .run()
                  }
                  data-test-id="comic-sans-quoted"
                >
                  <EditorToolbarItem
                    title="comic-sans-quoted"
                    active={
                      editor.isActive('textStyle', {
                        fontFamily: '"Comic Sans"',
                      })
                        ? 1
                        : 0
                    }
                  >
                    Comic Sans quoted
                  </EditorToolbarItem>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => editor.chain().focus().unsetFontFamily().run()}
                  data-test-id="unsetFontFamily"
                >
                  Unset font family
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EditorToolbar;
