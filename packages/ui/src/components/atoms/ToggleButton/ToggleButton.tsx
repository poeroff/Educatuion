import { MouseEvent } from 'react';
import styled from '@emotion/styled';

export interface ToggleButtonType extends IWrapper {
  id: string;
  isChecked?: boolean;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  isTranslation?: boolean;
  ariaLabel?: string;
}

interface IWrapper {
  width?: number;
  height?: number;
  buttonSize?: number;
  clickedLeft?: number;
}

export const ToggleButton = ({
  id,
  isChecked = false,
  onClick,
  isTranslation,
  width = isTranslation ? 64 : 84,
  height = isTranslation ? 32 : 40,
  buttonSize = isTranslation ? 24 : 32,
  clickedLeft = isTranslation ? 33 : 46,
  ariaLabel,
}: ToggleButtonType) => {
  if (isTranslation) {
    return (
      <ToggleContainer htmlFor='toggleTranslation'>
        <ToggleText>해석</ToggleText>
        <Wrapper
          id='toggleTranslation'
          type='checkbox'
          checked={isChecked}
          onClick={onClick}
          width={width}
          height={height}
          buttonSize={buttonSize}
          clickedLeft={clickedLeft}
          aria-label={isChecked ? '해석 숨기기' : '해석 보기'}
          readOnly
        />
      </ToggleContainer>
    );
  }
  return (
    <Wrapper
      id={id}
      type='checkbox'
      checked={isChecked}
      onClick={onClick}
      width={width}
      height={height}
      buttonSize={buttonSize}
      clickedLeft={clickedLeft}
      aria-label={ariaLabel}
      readOnly
    />
  );
};

export default ToggleButton;

const ToggleContainer = styled.label`
  cursor: pointer;

  display: flex;
  align-items: center;

  gap: 4px;

  font-family: 'SUIT';
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-18px);
  line-height: 28px;
`;

const Wrapper = styled.input<IWrapper>`
  cursor: pointer;

  appearance: none;
  box-sizing: border-box;

  position: relative;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  padding: 6px 0;

  border: 1px solid var(--color-grey-500);
  border-radius: 44px;

  background-color: var(--color-grey-100);

  &::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 3px;
    width: ${({ buttonSize }) => buttonSize}px;
    height: ${({ buttonSize }) => buttonSize}px;
    border-radius: 50%;
    background-color: var(--color-grey-600);
    transition: left 250ms linear;
  }

  &:checked::before {
    left: ${({ clickedLeft }) => clickedLeft}px;
    background-color: var(--color-blue-500);
  }

  &:checked {
    border: 1px solid #78aeff;
    background-color: var(--color-blue-50);
  }
`;

const ToggleText = styled.span`
  padding: 8px;
`;
