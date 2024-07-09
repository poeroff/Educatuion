import ExcellentClicked from '@maidt-cntn/assets/Stamp/ExcellentClicked.svg';
import ExcellentUnclicked from '@maidt-cntn/assets/Stamp/ExcellentUnclicked.svg';
import GoodClicked from '@maidt-cntn/assets/Stamp/GoodClicked.svg';
import GoodUnclicked from '@maidt-cntn/assets/Stamp/GoodUnclicked.svg';
import SosoClicked from '@maidt-cntn/assets/Stamp/SosoClicked.svg';
import SosoUnclicked from '@maidt-cntn/assets/Stamp/SosoUnclicked.svg';
import Oicon from '@maidt-cntn/assets/Stamp/OIcon.png';
import Xicon from '@maidt-cntn/assets/Stamp/XIcon.png';
import OiconUnclicked from '@maidt-cntn/assets/Stamp/OIconUnclicked.png';
import XiconUnclicked from '@maidt-cntn/assets/Stamp/XIconUnclicked.png';

import { Radio, SvgIcon } from '@maidt-cntn/ui';
import { EStampType, StampTextMap } from '..';
import Style from './Stamp.style';

export interface IStampProps {
  name?: string;
  stampType: EStampType;
  isClicked?: boolean;
  onClick?: (state: React.MouseEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  ariaLabel?: string;
  height?: string;
  width?: string;
}

export const Stamp = ({ name, stampType, isClicked = false, onClick, readOnly = false, ariaLabel, height, width }: IStampProps) => {
  const getStampIcon = (stampType: EStampType, clicked: boolean): string => {
    if (stampType === EStampType.Excellent) {
      return clicked ? ExcellentClicked : ExcellentUnclicked;
    } else if (stampType === EStampType.Good) {
      return clicked ? GoodClicked : GoodUnclicked;
    } else if (stampType === EStampType.Soso) {
      return clicked ? SosoClicked : SosoUnclicked;
    } else if (stampType === EStampType.O) {
      return clicked ? OiconUnclicked : Oicon;
    } else if (stampType === EStampType.X) {
      return clicked ? XiconUnclicked : Xicon;
    }
    return '';
  };

  const getStampText = (stampType: EStampType): string => {
    return StampTextMap[stampType];
  };

  const getStampSize = (stampType: EStampType): string => {
    return stampType !== EStampType.O && stampType !== EStampType.X ? '92px' : '68px';
  };

  return (
    <Radio name={name} value={isClicked} onClick={onClick} readOnly={readOnly} ariaLabel={ariaLabel ?? getStampText(stampType)}>
      <Style.StampContainer isClicked={isClicked} stampType={stampType} height={height} width={width}>
        <SvgIcon src={getStampIcon(stampType, isClicked)} size={getStampSize(stampType)} />
        {stampType !== EStampType.O && stampType !== EStampType.X && <p>{getStampText(stampType)}</p>}
      </Style.StampContainer>
    </Radio>
  );
};

export default Stamp;
