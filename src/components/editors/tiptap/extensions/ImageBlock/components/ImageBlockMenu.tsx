import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { FC, useCallback, useRef } from 'react';
import { Instance, sticky } from 'tippy.js';
import { v4 as uuid } from 'uuid';

import { Toolbar } from '@/components/ui/toolbar';
import { Icon } from '@/components/ui/icon';
import { ImageBlockWidth } from './ImageBlockWidth';
import { MenuProps } from '../../../components/menus/types';
import { getRenderContainer } from '@/lib/getRenderContainer';

export const ImageBlockMenu: FC<MenuProps> = ({ editor, appendTo }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tippyInstance = useRef<Instance | null>(null);

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-imageBlock');
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock');

    return isActive;
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign('left')
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign('center')
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign('right')
      .run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockWidth(value)
        .run();
    },
    [editor]
  );

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance;
        },
        appendTo: appendTo?.current ? () => appendTo.current! : 'parent',
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <Toolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
        <Toolbar.Button
          tooltip="Align image left"
          active={editor.isActive('imageBlock', { align: 'left' }) ? 1 : 0}
          onClick={onAlignImageLeft}
        >
          <Icon name="AlignHorizontalDistributeStart" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Align image center"
          active={editor.isActive('imageBlock', { align: 'center' }) ? 1 : 0}
          onClick={onAlignImageCenter}
        >
          <Icon name="AlignHorizontalDistributeCenter" />
        </Toolbar.Button>
        <Toolbar.Button
          tooltip="Align image right"
          active={editor.isActive('imageBlock', { align: 'right' }) ? 1 : 0}
          onClick={onAlignImageRight}
        >
          <Icon name="AlignHorizontalDistributeEnd" />
        </Toolbar.Button>
        <Toolbar.Divider />
        <ImageBlockWidth
          onChange={onWidthChange}
          value={parseInt(editor.getAttributes('imageBlock').width)}
        />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
};

export default ImageBlockMenu;
