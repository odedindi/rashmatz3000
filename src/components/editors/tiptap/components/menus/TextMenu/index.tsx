import { Icon } from '@/components/ui/icon';
import { Toolbar } from '@/components/ui/toolbar';
import { useTextmenuCommands } from './hooks/useTextmenuCommands';
import { useTextmenuStates } from './hooks/useTextmenuStates';
import { BubbleMenu, Editor } from '@tiptap/react';
import { memo } from 'react';
import { Surface } from '@/components/ui/surface';
import { ColorPicker } from '../../panels';
import { FontFamilyPicker } from './components/FontFamilyPicker';
import { FontSizePicker } from './components/FontSizePicker';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes';
import { ContentTypePicker } from './components/ContentTypePicker';
// import { AIDropdown } from './components/AIDropdown';
import { EditLinkPopover } from './components/EditLinkPopover';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
// We memorize the button so each button is not rerendered
// on every editor state change
const MemoButton = memo(Toolbar.Button);
const MemoColorPicker = memo(ColorPicker);
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  return (
    <BubbleMenu
      tippyOptions={{ popperOptions: { placement: 'top-start' } }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <Toolbar.Wrapper>
        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker
          onChange={commands.onSetFont}
          value={states.currentFont || ''}
        />
        <MemoFontSizePicker
          onChange={commands.onSetFontSize}
          value={states.currentSize || ''}
        />
        <Toolbar.Divider />
        <MemoButton
          tooltip="Bold"
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold ? 1 : 0}
        >
          <Icon name="Bold" />
        </MemoButton>
        <MemoButton
          tooltip="Italic"
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic ? 1 : 0}
        >
          <Icon name="Italic" />
        </MemoButton>
        <MemoButton
          tooltip="Underline"
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline ? 1 : 0}
        >
          <Icon name="Underline" />
        </MemoButton>
        <MemoButton
          tooltip="Strikehrough"
          tooltipShortcut={['Mod', 'Shift', 'S']}
          onClick={commands.onStrike}
          active={states.isStrike ? 1 : 0}
        >
          <Icon name="Strikethrough" />
        </MemoButton>
        <MemoButton
          tooltip="Code"
          tooltipShortcut={['Mod', 'E']}
          onClick={commands.onCode}
          active={states.isCode ? 1 : 0}
        >
          <Icon name="Code" />
        </MemoButton>
        <MemoButton tooltip="Code block" onClick={commands.onCodeBlock}>
          <Icon name="Codesandbox" />
        </MemoButton>
        <EditLinkPopover onSetLink={commands.onLink} />
        <Popover>
          <PopoverTrigger asChild>
            <MemoButton
              active={states.currentHighlight ? 1 : 0}
              tooltip="Highlight text"
            >
              <Icon name="Highlighter" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentHighlight}
                onChange={commands.onChangeHighlight}
                onClear={commands.onClearHighlight}
              />
            </Surface>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <MemoButton
              active={states.currentColor ? 1 : 0}
              tooltip="Text color"
            >
              <Icon name="Palette" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent side="top" sideOffset={8} asChild>
            <Surface className="p-1">
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <MemoButton tooltip="More options">
              <Icon name="GripVertical" />
            </MemoButton>
          </PopoverTrigger>
          <PopoverContent side="top" asChild>
            <Toolbar.Wrapper>
              <MemoButton
                tooltip="Subscript"
                tooltipShortcut={['Mod', '.']}
                onClick={commands.onSubscript}
                active={states.isSubscript ? 1 : 0}
              >
                <Icon name="Subscript" />
              </MemoButton>
              <MemoButton
                tooltip="Superscript"
                tooltipShortcut={['Mod', ',']}
                onClick={commands.onSuperscript}
                active={states.isSuperscript ? 1 : 0}
              >
                <Icon name="Superscript" />
              </MemoButton>
              <Toolbar.Divider />
              <MemoButton
                tooltip="Align left"
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft ? 1 : 0}
              >
                <Icon name="AlignLeft" />
              </MemoButton>
              <MemoButton
                tooltip="Align center"
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter ? 1 : 0}
              >
                <Icon name="AlignCenter" />
              </MemoButton>
              <MemoButton
                tooltip="Align right"
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight ? 1 : 0}
              >
                <Icon name="AlignRight" />
              </MemoButton>
              <MemoButton
                tooltip="Justify"
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify ? 1 : 0}
              >
                <Icon name="AlignJustify" />
              </MemoButton>
            </Toolbar.Wrapper>
          </PopoverContent>
        </Popover>
      </Toolbar.Wrapper>
    </BubbleMenu>
  );
};