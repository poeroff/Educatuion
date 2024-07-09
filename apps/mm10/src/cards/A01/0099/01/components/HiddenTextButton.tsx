import styled from 'styled-components';
import FingerIconSVG from '@/assets/finger.svg';
import { CSSProperties, useState } from 'react';
import { ESvgType, SvgIcon } from '@maidt-cntn/ui';

type TextStyleType = Pick<CSSProperties, 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'textAlign' | 'color'>;
type HiddenTextButtonProps = {
  width: string;
  height: string;
  children: React.ReactNode;
  textStyle: TextStyleType;
};

const HiddenTextButton = ({ width, height, children, textStyle }: HiddenTextButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return isVisible ? (
    <HiddenText $textStyle={textStyle} $isVisible={isVisible}>
      {children}
    </HiddenText>
  ) : (
    <HiddenTextButtonContainer
      $isVisible={isVisible}
      $width={width}
      $height={height}
      onClick={() => {
        setIsVisible(prev => !prev);
      }}
      disabled={isVisible}
    >
      <SvgIcon src={FingerIconSVG} type={ESvgType.IMG} width='21.99px' />
    </HiddenTextButtonContainer>
  );
};
export default HiddenTextButton;

const HiddenTextButtonContainer = styled.button<{ $isVisible: boolean; $width: string; $height: string }>`
  cursor: ${props => (props.$isVisible ? 'default' : 'pointer')};
  width: ${props => props.$width};
  height: ${props => props.$height};
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: 0px;
  background: ${props => (props.$isVisible ? 'transparent' : '#F4F8FF')};
  border: ${props => (props.$isVisible ? 'transparent' : '1px solid #1E6EFA')};

  &:hover {
    background: ${props => (props.$isVisible ? 'transparent' : '#bcd7ff')};
  }
`;

const HiddenText = styled.span<{ $isVisible: boolean; $textStyle: TextStyleType }>`
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};
  font-family: ${props => props.$textStyle.fontFamily};
  font-size: ${props => props.$textStyle.fontSize};
  font-weight: ${props => props.$textStyle.fontWeight};
  line-height: ${props => props.$textStyle.lineHeight};
  text-align: ${props => props.$textStyle.textAlign};
  color: ${props => props.$textStyle.color};
  white-space: nowrap;
`;
