import React, { ChangeEventHandler, MouseEventHandler, RefObject, useMemo, useState } from 'react';
import Style, { IStyleInput } from './Input.style';
import { InputStatus } from '@maidt-cntn/ui';

export type Ttype = 'text' | 'button' | 'number';

interface IInput extends IStyleInput {
  type?: Ttype;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  name?: string;
  inputRef?: RefObject<HTMLInputElement> | null;
  ariaLabel?: string;
  tabIndex?: number;
}

export const Input: React.FC<IInput> = ({
  type = 'text',
  status,
  inputSize = 'small',
  value = '',
  width = '200px',
  height,
  placeholder,
  textAlign,
  minWidth,
  disabled = false,
  readOnly = false,
  maxLength = 10,
  marginLeft = 0,
  onChange,
  onClick,
  name = '',
  inputRef,
  ariaLabel = '',
  tabIndex,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const textStatus = useMemo(() => {
    if (status) {
      return status;
    }
    if (value) {
      return InputStatus.ENABLE;
    }
    return InputStatus.DEFAULT;
  }, [status, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (type === 'number') {
      newValue = e.target.value?.replace(/[^0-9]/g, '');
    }
    onChange?.({ ...e, target: { ...e.target, value: newValue, name: e.target.name } });
  };

  const handleAriaLabel = (ariaLabel: string) => {
    if (textStatus === InputStatus.ERROR) {
      if (ariaLabel.length > 0) {
        ariaLabel = ariaLabel + ', 틀림';
      } else {
        ariaLabel = '틀림';
      }
    }

    return ariaLabel;
  };

  const handleOnClick = () => {
    setIsOpen(true);
  };

  if (type === 'button') {
    return (
      <>
        {isOpen ? (
          <Style.InputViewer
            type={'text'}
            value={value}
            width={width}
            minWidth={minWidth}
            height={height}
            readOnly
            aria-label={handleAriaLabel(ariaLabel)}
          />
        ) : (
          <Style.StickBtnWrap width={width} minWidth={minWidth} height={height}>
            <Style.StickButton type='button' aria-label='클릭해서 확인해보자' onClick={handleOnClick} />
            <Style.StickText>{value}</Style.StickText>
          </Style.StickBtnWrap>
        )}
      </>
    );
  }

  return (
    <Style.Input
      type={'text'}
      name={name}
      status={textStatus}
      inputSize={inputSize}
      width={width}
      minWidth={minWidth}
      height={height}
      textAlign={textAlign}
      marginLeft={marginLeft}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onChange={handleChange}
      onClick={onClick}
      maxLength={maxLength}
      ref={inputRef}
      aria-label={handleAriaLabel(ariaLabel)}
      tabIndex={tabIndex}
    />
  );
};

export default Input;
