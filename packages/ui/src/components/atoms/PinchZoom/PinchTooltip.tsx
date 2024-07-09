import { MouseEventHandler, useEffect, useState } from 'react';
import Style from './PinchTooltip.style';
import { EPinchBtnType } from '@/type/PinchZoom/EPinchBtnType';
import TooltipSVG from '@maidt-cntn/assets/tooltip.svg';
import image_zoom from '@maidt-cntn/assets/zoom.svg';
import video_zoom from '@maidt-cntn/assets/icons/videoZoom.svg';

export interface IPinchTooltipProps {
  onClickTooltip: MouseEventHandler<HTMLButtonElement>;
  pinchType: EPinchBtnType;
  disabled?: boolean;
  zIndex?: string;
}

export const PinchTooltip = ({ onClickTooltip, pinchType, disabled, zIndex }: IPinchTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const onMouseOverZoomButton = () => {
    setShowTooltip(true);
  };

  const onMouseLeaveZoomButton = () => {
    setShowTooltip(false);
  };

  return (
    <Style.TooltipWrapper zIndex={zIndex}>
      {showTooltip && !disabled && <img src={TooltipSVG} alt='크게 보고 싶을 때 눌러 보세요' />}
      <Style.ZoomButton
        type='button'
        aria-label='크게 보기'
        onClick={onClickTooltip}
        onMouseOver={onMouseOverZoomButton}
        onMouseLeave={onMouseLeaveZoomButton}
        disabled={disabled}
        backgroundImage={pinchType === 'image' ? image_zoom : video_zoom}
      />
    </Style.TooltipWrapper>
  );
};
