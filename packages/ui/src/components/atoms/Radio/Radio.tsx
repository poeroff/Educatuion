import React, { useEffect, useMemo, useRef, useState } from 'react';
import Style, { IRadioStyle } from './Radio.style';
import { IWAI } from '@emotion/react';

export interface IRadio extends IRadioStyle {
  type?: 'default' | 'square' | 'circle' | 'box' | 'circle-top-left';
  id?: string;
  value?: boolean;
  defaultValue?: boolean;
  label?: string;
  ariaLabel?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  children?: React.ReactNode;
  isError?: boolean;
  onClick?: (state: React.MouseEvent<HTMLInputElement>) => void;
}

export const Radio: React.FC<IRadio & IWAI> = ({
  value,
  defaultValue,
  name = 'radio-group',
  label = '',
  ariaLabel = '',
  align = 'horizontal',
  gap,
  disabled,
  readOnly,
  fontSize,
  type = 'default',
  children,
  isError,
  onClick,
  ...rest
}) => {
  const id = 'radio' + label + Math.round(Math.random() * 1000);
  const props = {
    id,
    name,
    disabled,
  };
  const [radioWidth, setRadioWidth] = useState(0);
  const [radioHeight, setRadioHeight] = useState(0);
  const ref = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const clientWidth = ref.current?.clientWidth ?? 0;
    const clientHeight = ref.current?.clientHeight ?? 0;
    setRadioWidth(clientWidth);
    setRadioHeight(clientHeight);
  }, [children, ref.current?.clientWidth, ref.current?.clientHeight]);

  const isChecked = useMemo(() => {
    return value;
  }, [value]);

  const Radio = useMemo(() => {
    switch (type) {
      case 'square':
      case 'box':
        return Style.RadioSquare;
      case 'circle':
        return Style.RadioRound;
      case 'circle-top-left':
        return Style.RadioTopLeft;
      default:
        return Style.Radio;
    }
  }, [type]);

  const content = useMemo(() => {
    switch (type) {
      case 'square':
      case 'box':
        return <Style.Square isBorder={type === 'box'}>{children}</Style.Square>;
      case 'circle':
        return (
          <>
            <Style.Icon />
            {label && <Style.Label fontSize={fontSize}>{label}</Style.Label>}
            {children}
          </>
        );
      case 'circle-top-left':
        return (
          <Style.ContentWrapper>
            <Style.IconTopLeft />
            {children}
          </Style.ContentWrapper>
        );
      default:
        return children;
    }
  }, [type, isError, children, label, fontSize]);

  const handleAriaLabel = (ariaLabel: string) => {
    if (isError) {
      if (ariaLabel.length > 0) {
        ariaLabel = ariaLabel + ', 틀림';
      } else {
        ariaLabel = '틀림';
      }
    } else if (isChecked) {
      if (ariaLabel.length > 0) {
        ariaLabel = ariaLabel + ', 선택됨';
      } else {
        ariaLabel = '선택됨';
      }
    }

    return ariaLabel;
  };

  return (
    <Style.Wrap htmlFor={id} align={align} gap={gap} isError={isError} isChecked={isChecked} readOnly={readOnly} ref={ref}>
      <Radio
        type={'radio'}
        value={label}
        aria-label={handleAriaLabel(ariaLabel)}
        width={radioWidth}
        height={radioHeight}
        {...(defaultValue ? { checked: isChecked } : { defaultChecked: isChecked })}
        {...props}
        onClick={val => {
          if (disabled || readOnly) {
            return;
          }
          onClick?.(val);
        }}
        onKeyDown={e => {
          if (readOnly && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
        }}
        readOnly={readOnly}
        isError={isError}
        {...rest}
      />
      {content}
    </Style.Wrap>
  );
};

export default Radio;
