import React from 'react';
import { buttons } from '../../../styles/tokens';
import { EStyleButtonTypes } from '../../../styles/types';
import StyledButton, { IStyledButtonProps } from './Button.style';

export interface ButtonProps extends IStyledButtonProps {
  label?: React.ReactNode;
  color?: EStyleButtonTypes;
  style?: React.CSSProperties;
  ariaLabel?: string;
  tabIndex?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label = '',
  color = EStyleButtonTypes.PRIMARY,
  style,
  ariaLabel = '',
  tabIndex,
  children,
  onClick,
  ...props
}) => {
  const colors = buttons;
  return (
    <StyledButton
      type='button'
      onClick={() => onClick?.()}
      style={{ ...colors[color], ...style }}
      aria-label={ariaLabel ?? (typeof label === 'string' && label ? label : '')}
      tabIndex={tabIndex}
      {...props}
    >
      {label}
      {children}
    </StyledButton>
  );
};
