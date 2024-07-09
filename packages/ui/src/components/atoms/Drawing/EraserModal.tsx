import { useState } from 'react';

import { SvgIcon, IEraserModalProps, DRAWING_PEN_STROKES, StrokeType } from '@maidt-cntn/ui';
import Style from './Drawing.style';

export const EraserModal = ({
  top,
  left,
  yPosition,
  eraserSize,
  isExistDrawing: isExsitingDrawing,
  setEraserSize,
  setIsEraserModalOpen,
  setIsAlertOpen,
}: IEraserModalProps) => {
  const handleEraserSizeChange = (value: number) => {
    setEraserSize(value);
  };

  const closeModal = () => {
    setIsEraserModalOpen(false);
  };

  return (
    <>
      <Style.DrawingModalWrapper top={top} left={left} yPosition={yPosition}>
        <Style.DrawingControlBox>
          <Style.DrawingControlLabel>두께</Style.DrawingControlLabel>
          <Style.DrawingControlItemBox>
            {DRAWING_PEN_STROKES.map((item: StrokeType, index: number) => (
              <Style.PenStroke key={index} onClick={() => handleEraserSizeChange(item.stroke)}>
                <SvgIcon src={eraserSize === item.stroke ? item.activeSrc : item.src} width='32px' height='32px' />
              </Style.PenStroke>
            ))}
          </Style.DrawingControlItemBox>
        </Style.DrawingControlBox>
        <Style.ClearAllButton onClick={() => setIsAlertOpen(true)} disabled={!isExsitingDrawing}>
          모두 지우기
        </Style.ClearAllButton>
      </Style.DrawingModalWrapper>
    </>
  );
};

export default EraserModal;
