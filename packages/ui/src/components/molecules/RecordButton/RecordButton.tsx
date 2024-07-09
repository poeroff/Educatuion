import { TRecordButton, RecordButtonIconMap, RecordButtonLabelMap } from '../../../type/RecordButton/RecordButtonType';
import { SvgIcon, Button } from '@maidt-cntn/ui';
import Style from './RecordButton.style';

interface IRecordButton {
  label: TRecordButton;
  id?: string;
  onClick?: () => void;
  tabIndex?: number;
  ariaLabel?: string;
  simpleIcon?: boolean;
}

export const RecordButton = ({ label, ariaLabel, tabIndex, simpleIcon, onClick, ...rest }: IRecordButton) => {
  const iconSrc = RecordButtonIconMap[label];
  const buttonText = RecordButtonLabelMap[label];
  const buttonStyle = Style.buttonStyleMap[label];
  const IconStyle = Style.iconStyleMap[label];

  return (
    <Button onClick={onClick} style={buttonStyle} aria-label={ariaLabel} tabIndex={tabIndex} {...rest}>
      {iconSrc && (
        <Style.IconWrapper>
          <SvgIcon src={iconSrc} style={IconStyle} />
        </Style.IconWrapper>
      )}
      {!simpleIcon && <Style.Label isIcon={!!iconSrc}>{buttonText}</Style.Label>}
    </Button>
  );
};

export default RecordButton;
