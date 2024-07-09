import styled, { css } from 'styled-components';
import { useState } from 'react';
import FingerIcon from '@/assets/A01/0001/03/finger.svg?react';

interface TextStyle {
  'font-family': string;
  'font-size': string;
  'font-weight': string;
  'line-height': string;
  'text-align': string;
  color: string;
}

interface HiddenTextButtonProps {
  boxWidth: number;
  boxHeight: number;
  textStyle: TextStyle;
  content: string;
}

const HiddenTextButton = ({ boxWidth, boxHeight, content, textStyle }: HiddenTextButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <HiddenTextButtonContainer
      isVisible={isVisible}
      boxWidth={boxWidth}
      boxHeight={boxHeight}
      onClick={() => {
        setIsVisible(true);
      }}
    >
      <HiddenText textStyle={textStyle} isVisible={isVisible}>
        {content}
      </HiddenText>
      {!isVisible && <FingerIcon />}
    </HiddenTextButtonContainer>
  );
};
export default HiddenTextButton;

const HiddenTextButtonContainer = styled.button<{ isVisible: boolean; boxWidth: number; boxHeight: number }>`
  cursor: ${props => (props.isVisible ? 'text' : 'pointer')};
  width: ${props => `${props.boxWidth}px`};
  height: ${props => `${props.boxHeight}px`};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-radius: 8px;
  border: 1px;
  opacity: 0px;
  background: ${props => (props.isVisible ? 'transparent' : 'rgba(217, 232, 255, 1)')};
  border: ${props => (props.isVisible ? 'transparent' : '1px solid rgba(120, 174, 255, 1)')};
  flex-shrink: 0;

  margin: 0 8px;

  &&:hover {
    background: ${props => (props.isVisible ? 'transparent' : '#bcd7ff')};
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const HiddenText = styled.p<{ isVisible: boolean; textStyle: TextStyle }>`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  white-space: nowrap;
  ${props =>
    props.textStyle &&
    css`
      font-family: ${props.textStyle['font-family']};
      font-size: ${props.textStyle['font-size'].includes('px') ? props.textStyle['font-size'] : `${props.textStyle['font-size']}px`};
      font-weight: ${props.textStyle['font-weight']};
      line-height: ${props.textStyle['line-height'].includes('px') ? props.textStyle['line-height'] : `${props.textStyle['line-height']}px`};
      text-align: ${props.textStyle['text-align']};
      color: ${props.textStyle.color};
    `}
`;