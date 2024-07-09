import { EStyleSizes } from '../../../styles/types';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';

export interface IStyledButtonProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  width?: string;
  height?: string;
  minWidth?: string;
  size?: EStyleSizes;
  useShadow?: boolean;
  useRound?: boolean;
  disabled?: boolean;
}

const defaultCSS: CSSProperties = {
  border: '0',
  fontSize: '16px',
  fontWeight: '700',
  padding: '6px 12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const sizes: { [key in EStyleSizes]: string } = {
  'full-auto': '100%',
  'xx-small': '36px',
  'x-small': '40px',
  small: '44px',
  medium: '53px',
  large: '53px',
  'x-large': '53px',
};

export const StyledButton = styled.button<IStyledButtonProps>(
  {
    ...defaultCSS,
  },
  ({ width = 'auto', height, minWidth = '', size = EStyleSizes.MEDIUM, useShadow = false, useRound = false, disabled = false }) => {
    return {
      width,
      minWidth: minWidth || sizes[size],
      height: height || sizes[size],
      boxShadow: useShadow ? ' 0px 4px 4px 0px #00000040' : 'unset',
      borderRadius: useRound ? '100px' : '8px',
      opacity: disabled ? 0.5 : 1,
    };
  },
);

export default StyledButton;
