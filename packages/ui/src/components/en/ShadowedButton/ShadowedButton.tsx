import Style, { IStyledShadowedButtonProps } from './ShadowedButton.style';
import { shadowedButtons } from '../../../styles/tokens';
import { EStyleShadowedButtonTypes } from '../../../styles/types';
import { TShadowedType } from '@/type/ShadowedButton/ShadowedButtonType';
import checkIcon from '@maidt-cntn/assets/icons/shadowedButton/shadowed_button_check.svg';
import xIcon from '@maidt-cntn/assets/icons/shadowedButton/shadowed_button_x.svg';

interface IShadowedButton extends IStyledShadowedButtonProps {
  type?: TShadowedType;
  label?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ariaLabel?: string | undefined;
  onClick?: () => void;
}

export const ShadowedButton: React.FC<IShadowedButton> = ({
  type = 'text',
  label,
  state = EStyleShadowedButtonTypes.DEFAULT,
  style,
  children,
  ariaLabel = '',
  onClick,
  ...props
}) => {
  const colors = shadowedButtons;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {type === 'text' ? (
        <Style.Btn
          onClick={() => onClick?.()}
          style={{ ...colors[state], ...style }}
          state={state}
          backgroundImage={state === EStyleShadowedButtonTypes.WARNING ? xIcon : checkIcon}
          {...props}
          aria-label={ariaLabel}
        >
          {label}
          {children}
        </Style.Btn>
      ) : (
        <Style.Box style={{ ...colors[state], ...style }} state={state} {...props} aria-label={ariaLabel}>
          {label}
          {children}
        </Style.Box>
      )}
    </>
  );
};

export default ShadowedButton;
