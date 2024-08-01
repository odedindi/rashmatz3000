'use client';

import {
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import { Textarea } from '@/components/ui/textarea';

export interface PlainTextEditorProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

// The hook is used in a text editor component to create a mirror element that reflects the content of the text area.
// The mirror element is used to measure the height of the content,
// which is then used to set the height of the text area.
// This approach allows the text area to automatically adjust its height based on the content.
const useMirrorId = (
  value: TextareaHTMLAttributes<HTMLTextAreaElement>['value']
) => {
  const mirrorId = useId();
  const [height, setHeight] = useState<number>();
  const scrollTolerance = 15;

  useEffect(() => {
    const clientHeight = document?.getElementById(mirrorId)?.clientHeight ?? 0;
    setHeight(clientHeight + scrollTolerance);
  }, [mirrorId, value]);

  return { mirrorId, height };
};

const PlainTextEditor = forwardRef<HTMLTextAreaElement, PlainTextEditorProps>(
  function PlainTextEditor({ className, ...props }, ref) {
    const { mirrorId, height } = useMirrorId(props.value);

    return (
      <div className="relative w-full">
        <Textarea
          className={cn('overflow-hidden', className)}
          ref={ref}
          style={{
            height: `${height}px`,
          }}
          {...props}
        />
        <div
          id={mirrorId}
          className={cn(
            'invisible absolute left-0 top-0 whitespace-pre-wrap',
            className
          )}
        >
          {props.value}&nbsp;
        </div>
      </div>
    );
  }
);

export default PlainTextEditor;
