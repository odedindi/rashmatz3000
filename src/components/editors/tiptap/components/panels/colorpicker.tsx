import { forwardRef, memo, useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Toolbar } from '@/components/ui/toolbar';
import { Icon } from '@/components/ui/icon';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { Input } from '@/components/ui/input';

export type ColorButtonProps = {
  color?: string;
  active?: 1 | 0;
  onColorChange?: (color: string) => void; // eslint-disable-line no-unused-vars
};

export const ColorButton = memo(
  ({ color = '', active, onColorChange }: ColorButtonProps) => {
    const wrapperClassName = cn(
      'flex items-center justify-center px-1.5 py-1.5 rounded group',
      !active && 'hover:bg-neutral-100',
      active && 'bg-neutral-100'
    );
    const bubbleClassName = cn(
      'w-4 h-4 rounded bg-slate-100 shadow-sm ring-offset-2 ring-current',
      !active && `hover:ring-1`,
      active && `ring-1`
    );

    const handleClick = useCallback(
      () => onColorChange?.(color),
      [onColorChange, color]
    );

    return (
      <button onClick={handleClick} className={wrapperClassName}>
        <div
          style={{ backgroundColor: color, color }}
          className={bubbleClassName}
        ></div>
      </button>
    );
  }
);

ColorButton.displayName = 'ColorButton';

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
  className?: ClassValue;
};

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  ({ color = '', onChange, onClear, className }, ref) => {
    const [colorInputValue, setColorInputValue] = useState(color);

    const handleColorUpdate = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setColorInputValue(event.target.value);
      },
      []
    );

    const handleColorChange = useCallback(() => {
      const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

      if (!isCorrectColor) {
        onChange?.('');
        return;
      }

      onChange?.(colorInputValue);
    }, [colorInputValue, onChange]);

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        <HexColorPicker
          className="m-auto w-full"
          color={color}
          onChange={onChange}
        />
        <Input
          type="text"
          className="w-full rounded border border-neutral-200 bg-white p-2 text-black focus:outline-1 focus:outline-neutral-300 focus:ring-0 dark:border-neutral-800 dark:bg-black dark:text-white dark:focus:outline-neutral-700"
          placeholder="#000000"
          value={colorInputValue}
          onChange={handleColorUpdate}
          onBlur={handleColorChange}
        />
        <div className="flex max-w-[15rem] flex-wrap items-center justify-center gap-1">
          {solids.map((c, i) => (
            <ColorButton
              key={i}
              active={c === color ? 1 : 0}
              color={c}
              onColorChange={onChange}
            />
          ))}
          <Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
            <Icon name="Undo" />
          </Toolbar.Button>
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';

const solids = [
  '#accbee',
  '#e7f0fd',
  '#d5d4d0',
  '#eeeeec',
  '#000000',
  '#434343',
  '#09203f',
  '#537895',
  '#ac32e4',
  '#7918f2',
  '#4801ff',
  '#f953c6',
  '#b91d73',
  '#ee0979',
  '#ff6a00',
  '#f00000',
  '#dc281e',
  '#00c6ff',
  '#0072ff',
  '#4facfe',
  '#00f2fe',
  '#0ba360',
  '#3cba92',
  '#fdfc47',
  '#24fe41',
  '#8a2be2',
  '#0000cd',
  '#228b22',
  '#ccff00',
  '#40e0d0',
  '#ff8c00',
  '#ff0080',
  '#fcc5e4',
  '#fda34b',
  '#ff7882',
  '#c8699e',
  '#7046aa',
  '#0c1db8',
  '#020f75',
  '#ff75c3',
  '#ffa647',
  '#ffe83f',
  '#9fff5b',
  '#70e2ff',
  '#cd93ff',
  '#e2e2e2',
];

const gradients = [
  'linear-gradient(to top left,#accbee,#e7f0fd)',
  'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
  'linear-gradient(to top left,#000000,#434343)',
  'linear-gradient(to top left,#09203f,#537895)',
  'linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)',
  'linear-gradient(to top left,#f953c6,#b91d73)',
  'linear-gradient(to top left,#ee0979,#ff6a00)',
  'linear-gradient(to top left,#F00000,#DC281E)',
  'linear-gradient(to top left,#00c6ff,#0072ff)',
  'linear-gradient(to top left,#4facfe,#00f2fe)',
  'linear-gradient(to top left,#0ba360,#3cba92)',
  'linear-gradient(to top left,#FDFC47,#24FE41)',
  'linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)',
  'linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)',
  'linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)',
  'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
];
