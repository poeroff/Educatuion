import React from 'react';
import Style, { ITagStyle } from './Tag.style';

export interface ITagProps extends ITagStyle {
  label: React.ReactNode;
}

export const Tag: React.FC<ITagProps> = ({ label, fontSize = '22px', ...rest }) => {
  return (
    <Style.Container fontSize={fontSize} {...rest}>
      {label}
    </Style.Container>
  );
};

export default Tag;
