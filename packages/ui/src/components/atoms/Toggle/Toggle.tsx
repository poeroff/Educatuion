import { useState } from 'react';
import StyleToggle from './Toggle.style';

export interface IToggleProps {
  size?: string;
  disabled?: boolean;
  value?: boolean;
  tabIndex?: number;
  onClick?: (value: boolean) => void;
}

export const Toggle = ({ size = '32px', disabled = false, value = false, onClick, ...rest }: IToggleProps) => {
  const [clicked, setClicked] = useState<boolean>(value);

  const handleToggleChange = () => {
    if (!disabled) {
      setClicked(!clicked);
      if (onClick) {
        onClick?.(clicked);
      }
    }
    return clicked;
  };

  return (
    <StyleToggle.Container onClick={handleToggleChange} {...rest}>
      <StyleToggle.Wrapper className={clicked ? 'clicked' : ''} clicked={clicked} size={size} disabled={disabled} />
      <StyleToggle.CircleWrapper className={clicked ? 'clicked' : ''} clicked={clicked} size={size} disabled={disabled} />
    </StyleToggle.Container>
  );
};

export default Toggle;
