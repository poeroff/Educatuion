import React, { ChangeEventHandler, useEffect, useMemo, useRef } from 'react';
import Style, { ITextareaStyle } from './Textarea.style';
import Scroll from '../Scroll/Scroll';
import { TextareaStatus } from '@maidt-cntn/ui';

export interface ITextarea extends ITextareaStyle {
  rows?: number;
  value?: string;
  defaultValue?: string;
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  validation?: () => boolean;
}

export const Textarea: React.FC<ITextarea> = ({
  value,
  defaultValue,
  name = 'textarea',
  readOnly,
  disabled,
  placeholder = '내용을 넣어 주세요.',
  onChange,
  width = '100%',
  height = '100%',
  textAlign = 'left',
  status,
  ariaLabel,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const textStatus = useMemo(() => {
    if (status) {
      return status;
    }
    if (value) {
      return TextareaStatus.ENABLE;
    }
    return TextareaStatus.DEFAULT;
  }, [status, value]);

  const resizeHeight = () => {
    const textarea = textareaRef.current;
    const container = containerRef.current;

    if (!textarea || !container) {
      return;
    }

    const textAlign = globalThis.getComputedStyle(textarea).textAlign;

    if (textAlign !== 'center') {
      return;
    }

    textarea.style.height = 'auto';

    if (textarea.scrollHeight < container.clientHeight) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    } else {
      textarea.style.height = '100%';
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
    onChange?.(event);
    resizeHeight();
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container && !observer.current) {
      observer.current = new ResizeObserver(() => {
        resizeHeight();
      });

      observer.current.observe(container);
    }
  }, [containerRef]);

  return (
    <Style.Container status={textStatus} width={width} height={height} onClick={() => textareaRef.current?.focus()}>
      <Style.Textarea
        ref={textareaRef}
        rows={1}
        value={value}
        defaultValue={defaultValue}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={handleChange}
        {...rest}
      />
    </Style.Container>
  );
};

export default Textarea;
