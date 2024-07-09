import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { SvgIcon } from '@maidt-cntn/ui';
import HandPointingSVG from '@/assets/A01/0003/03/hand_pointing.svg';

interface IHiddenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  showText: boolean;
  children?: ReactNode;
}

function HiddenTextButton({ width = '100px', children, showText, ...props }: IHiddenButtonProps) {
  return (
    <Wrapper width={width} showText={showText} {...props}>
      {showText ? children : <SvgIcon src={HandPointingSVG} size='32px' />}
    </Wrapper>
  );
}

const Wrapper = styled.button<{ width: string; showText: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;

  white-space: nowrap;

  height: 40px;
  width: ${({ width }) => width};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  align-self: center;

  border: 1px solid var(--color-blue-300);
  border-radius: 8px;

  background-color: var(--color-blue-100);

  ${({ showText }) =>
    showText &&
    `
    border: none;
    background-color: transparent;
  `}
`;

export default HiddenTextButton;
