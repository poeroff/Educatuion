import { SvgIcon, IPenModalProps, DRAWING_PEN_COLORS, DRAWING_PEN_STROKES, StrokeType } from '@maidt-cntn/ui';

import Edit from '@maidt-cntn/assets/drawing/edit-03.svg';

import Style from './Drawing.style';

export const PenModal = ({
  top,
  left,
  yPosition,
  penSize,
  penColor,
  isLine,
  setPenSize,
  setPenColor,
  setIsLine,
  setIsPenModalOpen,
}: IPenModalProps) => {
  const handlePenSizeChange = (value: number) => {
    setPenSize(value);
  };

  const handleColorChange = (color: string) => {
    setPenColor(color);
  };

  const handleLineToggle = () => {
    setIsLine(!isLine);
  };

  return (
    <Style.DrawingModalWrapper top={top} left={left} yPosition={yPosition} isPen>
      <Style.DrawingControlBox isPen>
        <Style.DrawingControlLabel>두께</Style.DrawingControlLabel>
        <Style.DrawingControlItemBox>
          {DRAWING_PEN_STROKES.map((item: StrokeType, index: number) => (
            <Style.PenStroke key={index} onClick={() => handlePenSizeChange(item.stroke)}>
              <SvgIcon src={penSize === item.stroke ? item.activeSrc : item.src} width='32px' height='32px' />
            </Style.PenStroke>
          ))}
        </Style.DrawingControlItemBox>
        <Style.DrawingControlLabel>색상</Style.DrawingControlLabel>
        <Style.DrawingControlItemBox>
          {DRAWING_PEN_COLORS.map((color: string, index: number) => (
            <Style.PenColor key={index} $active={color === penColor} onClick={() => handleColorChange(color)}>
              <Style.PenColorCircle color={color} />
            </Style.PenColor>
          ))}
        </Style.DrawingControlItemBox>
      </Style.DrawingControlBox>
      <Style.StraightControlBox onClick={handleLineToggle}>
        <Style.DrawingControlLabel>
          <SvgIcon src={Edit} width='20px' height='20px' />
          직선 그리기
        </Style.DrawingControlLabel>
        <Style.ToggleButton isLine={isLine}>
          <Style.OnOff />
        </Style.ToggleButton>
      </Style.StraightControlBox>
    </Style.DrawingModalWrapper>
  );
};

export default PenModal;
