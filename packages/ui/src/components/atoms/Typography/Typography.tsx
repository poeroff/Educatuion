import React, { useState } from 'react';
import { typographies } from '../../../styles/tokens';
import { ETypographyTypes } from '../../../styles/types';
import Style, { ITypographyProps } from './Typography.style';
import { IWAI } from '@emotion/react';

export interface ITypography extends ITypographyProps, IWAI {
  useSticker?: boolean;
  children?: React.ReactNode;
}

export const Typography = ({
  styleType = ETypographyTypes.BODY,
  size,
  fontSize,
  lineHeight,
  align,
  textDecoration = 'none',
  useGap = true,
  useSticker = false,
  children,
  ...rest
}: ITypography) => {
  const defaultStyle = typographies[styleType];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <Style.TextStyled
      size={size || defaultStyle.size}
      fontSize={fontSize}
      lineHeight={lineHeight}
      align={align || defaultStyle.align}
      textDecoration={textDecoration}
      useGap={useGap}
      {...rest}
    >
      {children}
      {useSticker && !isOpen && <Style.ClickButton type='button' aria-label='클릭해서 확인해보자' onClick={handleOnClick} />}
    </Style.TextStyled>
  );
};

export default Typography;
