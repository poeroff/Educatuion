import React, { useEffect, useMemo, useRef, useState } from 'react';
import Style, { ICheckboxStyle } from './Checkbox.style';
import { IWAI } from '@emotion/react';

export interface ICheckbox extends ICheckboxStyle {
  type?: 'default' | 'square' | 'check' | 'box';
  id?: string;
  value?: boolean;
  defaultValue?: boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
  isError?: boolean;
  children?: React.ReactNode;
  onClick?: (state: React.MouseEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  ariaLabel?: string;
}

export const Checkbox: React.FC<ICheckbox & IWAI> = ({
  value,
  defaultValue,
  name = 'checkbox-group',
  label = '',
  align = 'horizontal',
  gap,
  disabled,
  fontSize,
  type = 'default',
  children,
  isError,
  onClick,
  readOnly,
  ariaLabel = '',
  ...rest
}) => {
  const id = 'checkbox' + label + Math.round(Math.random() * 1000);
  const props = {
    id,
    name,
    disabled,
  };
  const [checkboxWidth, setCheckboxWidth] = useState(0);
  const [checkboxHeight, setCheckboxHeight] = useState(0);
  const ref = useRef<HTMLLabelElement>(null);

  const ariaLabelValue = useMemo(() => {
    if (isError) {
      if (ariaLabel) {
        return `틀림, ${ariaLabel}`;
      }
      return '틀림';
    }
    if (value) {
      if (ariaLabel) {
        return `선택됨, ${ariaLabel}`;
      }
      return '선택됨';
    }
    return ariaLabel;
  }, [ariaLabel, isError, value]);

  useEffect(() => {
    const clientWidth = ref.current?.clientWidth ?? 0;
    const clientHeight = ref.current?.clientHeight ?? 0;
    setCheckboxWidth(clientWidth);
    setCheckboxHeight(clientHeight);
  }, [children, ref.current?.clientHeight]);

  const isChecked = useMemo(() => {
    return value;
  }, [value]);

  const Checkbox = useMemo(() => {
    switch (type) {
      case 'square':
      case 'box':
        return Style.CheckboxSquare;
      case 'check':
        return Style.CheckboxDefault;
      default:
        return Style.Checkbox;
    }
  }, [type, value]);

  const content = useMemo(() => {
    switch (type) {
      case 'square':
      case 'box':
        return <Style.Square isBorder={type === 'box'}>{children}</Style.Square>;
      case 'check':
        return (
          <>
            <Style.Icon />
            {label && <Style.Label fontSize={fontSize}>{label}</Style.Label>}
            {children}
          </>
        );
      default:
        return <>{children}</>;
    }
  }, [type, value, label, fontSize, children]);

  return (
    <Style.Wrap htmlFor={id} align={align} gap={gap} ref={ref}>
      <Checkbox
        type={'checkbox'}
        value={label}
        width={checkboxWidth}
        height={checkboxHeight}
        {...(defaultValue ? { checked: isChecked } : { defaultChecked: isChecked })}
        {...props}
        onClick={event => {
          if (disabled || readOnly) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        isError={isError}
        aria-label={ariaLabelValue}
        {...rest}
      />
      {content}
    </Style.Wrap>
  );
};

export default Checkbox;
