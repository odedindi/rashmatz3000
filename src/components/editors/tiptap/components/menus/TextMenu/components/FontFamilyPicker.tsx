import {
  DropdownButton,
  DropdownCategoryTitle,
} from '../../../dropdown-button';
import { Icon } from '@/components/ui/icon';
import { Surface } from '@/components/ui/surface';
import { Toolbar } from '@/components/ui/toolbar';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useCallback } from 'react';

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: 'font-sans' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },

      {
        label: 'Comic Sans MS, Comic Sans',
        value: 'Comic Sans MS, Comic Sans',
      },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [
  group.options,
]).flat();

export type FontFamilyPickerProps = {
  onChange: (value: string) => void;
  value: string;
};

export const FontFamilyPicker = ({
  onChange,
  value,
}: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value);
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter';

  const selectFont = useCallback(
    (font: string) => () => onChange(font),
    [onChange]
  );

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button active={currentValue?.value ? 1 : 0}>
          {currentFontLabel}
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild className="h-auto overflow-scroll">
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {FONT_FAMILY_GROUPS.map((group) => (
            <div
              key={group.label}
              className="mt-2.5 flex flex-col gap-0.5 first:mt-0"
            >
              <DropdownCategoryTitle>{group.label}</DropdownCategoryTitle>
              {group.options.map((font) => (
                <DropdownButton
                  key={`${font.label}_${font.value}`}
                  isActive={font.label === currentFontLabel}
                  onClick={selectFont(font.value)}
                >
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </DropdownButton>
              ))}
            </div>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
