import { MouseEventHandler, useState } from 'react';
import styled from '@emotion/styled';
import TooltipSVG from '@maidt-cntn/assets/customImage/tooltip.svg';
import ZoomSVG from '@maidt-cntn/assets/customImage/zoom.svg';

export interface ITooltipProps {
  onClickTooltip: MouseEventHandler<HTMLButtonElement>;
}

export const Tooltip = ({ onClickTooltip }: ITooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onMouseOverZoomButton = () => {
    setShowTooltip(true);
  };

  const onMouseLeaveZoomButton = () => {
    setShowTooltip(false);
  };

  return (
    <TooltipWrapper>
      {showTooltip && <img src={TooltipSVG} alt='크게 보고 싶을 때 눌러 보세요' />}
      <ZoomButton type='button' onClick={onClickTooltip} onMouseOver={onMouseOverZoomButton} onMouseLeave={onMouseLeaveZoomButton}>
        <img src={ZoomSVG} alt='사진 크게보기' />
      </ZoomButton>
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  z-index: 1;
  bottom: 0%;
  right: 0%;
  height: 40px;
`;

const ZoomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 36px;
  aspect-ratio: 1/1;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
