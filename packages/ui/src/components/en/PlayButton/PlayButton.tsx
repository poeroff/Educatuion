import { Radio } from '@maidt-cntn/ui';
import Style, { IStylePlayButton } from './PlayButton.stylet';
import { useState } from 'react';

interface IPlayButton extends IStylePlayButton {
  label: string;
  onClick?: () => void;
}

export const PlayButton = ({ label, color, disabled = false, isActive = false, onClick }: IPlayButton) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleClick = () => {
    onClick?.();
    setIsChecked(!isChecked);
  };
  return (
    <Radio name='role-play-radio-group' ariaLabel='역할극 선택하는 버튼' value={isChecked} onClick={handleClick}>
      <Style.PlayButton color={color} disabled={disabled} isActive={isActive}>
        {label}
      </Style.PlayButton>
    </Radio>
  );
};

export default PlayButton;
