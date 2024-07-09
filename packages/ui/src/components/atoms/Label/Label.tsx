import React, { useMemo } from 'react';
import Style, { ILabelStyle } from './Label.style';
import { IWAI } from '@emotion/react';

export interface ILabelProps extends ILabelStyle, IWAI {
  value?: React.ReactNode;
  cssStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Label: React.FC<ILabelProps> = ({
  value,
  alt,
  type = 'line',
  size = 'middle',
  marginRight,
  background,
  children,
  cssStyle,
  ...rest
}) => {
  const label = typeof value === 'string' && value.endsWith('.svg') ? <img src={value} alt={alt || ''} /> : value;
  const content = useMemo(() => {
    switch (type) {
      case 'arrow':
      case 'rhombus':
        return (
          <Style.Wrap type={type} style={cssStyle}>
            <Style.Arrow type={type} background={background || 'var(--color-h-math-primary-origin)'} {...rest} />
            {label}
            {children}
          </Style.Wrap>
        );
      case 'level':
        return (
          <Style.Wrap style={cssStyle}>
            <Style.Level {...rest} />
            {label}
            {children}
          </Style.Wrap>
        );
      case 'step':
        return (
          <>
            <Style.Step style={cssStyle}>Step</Style.Step>
            {typeof value === 'number' && value < 10 && <span>0</span>}
            {value}
            {children}
          </>
        );
      case 'star':
        return (
          <Style.Star>
            {value}
            {children}
          </Style.Star>
        );
      case 'dot':
        return (
          <Style.Dot>
            {value}
            {children}
          </Style.Dot>
        );
      default:
        return (
          <Style.Label type={type} size={size} marginRight={marginRight} background={background} style={cssStyle} {...rest}>
            {label}
            {children}
          </Style.Label>
        );
    }
  }, [value, alt, type, size, marginRight, background, rest]);

  return content;
};

export default Label;
