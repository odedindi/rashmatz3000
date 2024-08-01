import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';
import { type FC, memo } from 'react';

export type EditorInfoProps = {
  characters: number;
  words: number;
  className?: ClassValue;
};

export const EditorInfo: FC<EditorInfoProps> = memo(
  ({ characters, words, className }) => {
    return (
      <div className={cn('flex items-center', className)}>
        <div className="mr-4 flex flex-col justify-center border-r border-neutral-200 pr-4 text-right dark:border-neutral-800">
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {words} {words === 1 ? 'word' : 'words'}
          </div>
          <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {characters} {characters === 1 ? 'character' : 'characters'}
          </div>
        </div>
      </div>
    );
  }
);

EditorInfo.displayName = 'EditorInfo';
